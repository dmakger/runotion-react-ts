import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {cls} from "core/service/cls";
import cl from "core/modal/TaskDetail/components/sidebar/components/block/users/ui/_UsersBlockSidebarTask.module.scss";
import {ITask} from "core/entity/Task/model/model";
import User from "core/entity/User/ui/user/User";
import {IUsersBlockSidebarTaskData} from "core/modal/TaskDetail/components/sidebar/components/block/users/model/model";
import SmartSelect, {ISmartSelectOption} from 'core/components/SmartSelect/SmartSelect';
import {IUser} from 'core/entity/User/model/model';
import {addTaskUserAPI, deleteTaskUserAPI} from 'core/entity/Task/api/TaskApi';
import {getProjectUsersWithParamsAPI} from 'core/entity/Project/api/ProjectApi';
import {IQueryToProjectUsers} from 'core/entity/Project/model/model';
import {getUserDepartmentName, getUserDisplayName} from "core/entity/User/service/service";

interface UsersBlockSidebarTaskProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
    className?: string
}

type TaskMemberLevel = 'responsible' | 'collaborator' | 'observer'

interface IPendingMember {
    user: IUser
    level: TaskMemberLevel
}

const UsersBlockSidebarTask = ({task, onTaskChange = () => {}, className}: UsersBlockSidebarTaskProps) => {
    const [users, setUsers] = useState<IUser[]>([])
    const [userSearch, setUserSearch] = useState('')
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [pendingMembers, setPendingMembers] = useState<IPendingMember[]>([])

    const loadUsers = useCallback((search: string) => {
        setIsUsersLoading(true)
        return getProjectUsersWithParamsAPI(task.project.id, {
            page: '1',
            limit: '30',
            search,
        }).then((response: IQueryToProjectUsers) => {
            setUsers((response.results || []).map(item => item.user))
        }).finally(() => setIsUsersLoading(false))
    }, [task.project.id])

    useEffect(() => {
        const timeout = setTimeout(() => loadUsers(userSearch), 250)
        return () => clearTimeout(timeout)
    }, [loadUsers, userSearch])

    const existingUserIds = useMemo(() => {
        return new Set([
            task.director?.id,
            task.responsible?.id,
            ...(task.collaborators || []).map(user => user.id),
            ...(task.observers || []).map(user => user.id),
            ...pendingMembers.map(item => item.user.id),
        ].filter(Boolean))
    }, [pendingMembers, task.collaborators, task.director?.id, task.observers, task.responsible?.id])

    const userOptions: ISmartSelectOption[] = users
        .filter(user => !existingUserIds.has(user.id))
        .map(user => ({
            value: user.id,
            label: getUserDisplayName(user),
            subtitle: getUserDepartmentName(user) || user.username || 'Пользователь',
            image: user.image,
            entity: 'user',
        }))

    const responsibleOptions: ISmartSelectOption[] = [
        task.responsible,
        task.director,
        ...(task.collaborators || []),
        ...(task.observers || []),
        ...users,
    ].filter((user, index, array): user is IUser => {
        return !!user && array.findIndex(item => item?.id === user.id) === index
    }).map(user => ({
        value: user.id,
        label: getUserDisplayName(user),
        subtitle: getUserDepartmentName(user) || user.username || 'Пользователь',
        image: user.image,
        entity: 'user',
    }))

    const findAvailableUser = (value: string | number) => {
        return [
            task.responsible,
            task.director,
            ...(task.collaborators || []),
            ...(task.observers || []),
            ...users,
        ].find(user => String(user?.id) === String(value))
    }

    const addUserToTask = (level: TaskMemberLevel, value: string | number) => {
        if (!value) return

        const selectedUser = findAvailableUser(value)
        if (!selectedUser) return

        if (level === 'responsible') {
            const optimisticTask = {
                ...task,
                responsible: selectedUser,
                collaborators: (task.collaborators || []).filter(user => user.id !== selectedUser.id),
                observers: (task.observers || []).filter(user => user.id !== selectedUser.id),
            }
            onTaskChange(optimisticTask)
            setUserSearch('')

            addTaskUserAPI(task.id, {user_id: value, level})
                .then((response: ITask) => {
                    onTaskChange(response)
                    window.dispatchEvent(new CustomEvent('runotion:task-updated', {
                        detail: {
                            task: response,
                            projectId: task.project.id,
                        }
                    }))
                })
                .catch(() => onTaskChange(task))
            return
        }

        setPendingMembers(prev => {
            if (prev.some(item => item.user.id === selectedUser.id)) return prev
            return [...prev, {user: selectedUser, level}]
        })
        setUserSearch('')

        addTaskUserAPI(task.id, {user_id: value, level})
            .then((response: ITask) => {
                onTaskChange(response)
                window.dispatchEvent(new CustomEvent('runotion:task-updated', {
                    detail: {
                        task: response,
                        projectId: task.project.id,
                    }
                }))
            })
            .catch(() => {})
            .finally(() => {
                setPendingMembers(prev => prev.filter(item => item.user.id !== selectedUser.id))
            })
    }

    const removeUserFromTask = (user: IUser, level: 'collaborator' | 'observer') => {
        const optimisticTask = {
            ...task,
            collaborators: level === 'collaborator'
                ? (task.collaborators || []).filter(item => item.id !== user.id)
                : task.collaborators,
            observers: level === 'observer'
                ? (task.observers || []).filter(item => item.id !== user.id)
                : task.observers,
        }
        onTaskChange(optimisticTask)

        deleteTaskUserAPI(task.id, user.id)
            .then((response: ITask) => {
                onTaskChange(response)
                window.dispatchEvent(new CustomEvent('runotion:task-updated', {
                    detail: {
                        task: response,
                        projectId: task.project.id,
                    }
                }))
            })
            .catch(() => onTaskChange(task))
    }

    const data: IUsersBlockSidebarTaskData[] = [
        {title: 'Поставщик', data: [task.director]},
        {title: 'Ответственный', data: [task.responsible] as IUsersBlockSidebarTaskData['data']},
        {title: 'Соисполнители', data: task.collaborators as IUsersBlockSidebarTaskData['data']},
        {title: 'Наблюдатели', data: task.observers as IUsersBlockSidebarTaskData['data']},
    ]

    const renderAddUser = (level: TaskMemberLevel) => (
        <SmartSelect value={''}
                     options={userOptions}
                     onChange={(value) => addUserToTask(level, value)}
                     placeholder={isUsersLoading ? 'Загрузка...' : '+ Добавить'}
                     searchPlaceholder={'Найти пользователя'}
                     searchValue={userSearch}
                     onSearchChange={setUserSearch}
                     loading={isUsersLoading}
                     emptyText={'Пользователи не найдены'}
                     className={cl.addSelect}/>
    )

    const renderResponsibleSelect = () => (
        <SmartSelect value={task.responsible?.id || ''}
                     options={responsibleOptions}
                     onChange={(value) => addUserToTask('responsible', value)}
                     placeholder={isUsersLoading ? 'Загрузка...' : 'Выбрать ответственного'}
                     searchPlaceholder={'Найти пользователя'}
                     searchValue={userSearch}
                     onSearchChange={setUserSearch}
                     loading={isUsersLoading}
                     emptyText={'Пользователи не найдены'}
                     className={cl.addSelect}/>
    )

    const renderPendingUser = (member: IPendingMember) => (
        <div className={cl.pendingUser} key={`pending-${member.user.id}-${member.level}`}>
            <User user={member.user}/>
            <span className={cl.pendingSpinner}/>
        </div>
    )

    const renderMemberList = (level: TaskMemberLevel, members: IUsersBlockSidebarTaskData['data']) => {
        const pendingByLevel = pendingMembers.filter(item => item.level === level)

        return (
            <>
                <div className={cl.addSticky}>
                    {renderAddUser(level)}
                </div>
                {members.map(user => (
                    user &&
                    <div className={cl.memberRow} key={user.id}>
                        <User user={user}/>
                        <button className={cl.removeUser}
                                type="button"
                                aria-label="Убрать пользователя"
                                onClick={() => removeUserFromTask(user, level === 'observer' ? 'observer' : 'collaborator')}>
                            x
                        </button>
                    </div>
                ))}
                {pendingByLevel.map(renderPendingUser)}
            </>
        )
    }

    return (
        <div className={cls(cl.block, className)}>
            {data.map((it, index) => (
                <div className={cl.item} key={index}>
                    <div className={cl.top}>
                        <span className={cl.title}>{it.title}:</span>
                    </div>
                    <div className={cl.line}/>

                    <div className={cls(cl.list, index > 1 ? cl.scrollList : '')}>
                        {index === 1 && renderResponsibleSelect()}
                        {index === 2 && renderMemberList('collaborator', it.data)}
                        {index === 3 && renderMemberList('observer', it.data)}
                        {index === 0 && it.data.map(user => (
                            user && <User user={user} key={user.id}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersBlockSidebarTask;
