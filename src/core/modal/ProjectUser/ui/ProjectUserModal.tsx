import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Modal from 'core/modal/core/ui/ui/Modal';
import Button from 'core/components/Button/ui/parent/Button';
import {ETypeButton} from 'core/components/Button/model/model';
import {IHintModal, IModal} from 'core/modal/core/modal/modal';
import {getErrorHintModal, getSuccessHintModal} from 'core/modal/core/ui/components/hint/service/service';
import {
    addProjectUserAPI,
    getProjectRolesAPI,
    getProjectUsersWithParamsAPI
} from 'core/entity/Project/api/ProjectApi';
import {IQueryToProjectUsers, IRoleProject, IUserToProject} from 'core/entity/Project/model/model';
import {getUsersAPI} from 'core/entity/User/api/UserAPI';
import {IUser} from 'core/entity/User/model/model';
import {cls} from 'core/service/cls';
import User from 'core/entity/User/ui/user/User';
import cl from './_ProjectUserModal.module.scss';

interface ProjectUserModalProps extends IModal {
    projectId: number | string
    className?: string
}

interface IUserQuery {
    count: number
    pages: number
    results: IUser[]
}

const PAGE_LIMIT = '12'
const USER_LIMIT = '10'

const getDisplayName = (user: IUser) => user.name || user.username || `ID ${user.id}`

const ProjectUserModal = ({projectId, isVisible = false, setIsVisible, className}: ProjectUserModalProps) => {
    const [roles, setRoles] = useState<IRoleProject[]>([])
    const [projectUsers, setProjectUsers] = useState<IUserToProject[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [selectedUserId, setSelectedUserId] = useState('')
    const [selectedRoleId, setSelectedRoleId] = useState('')
    const [memberSearch, setMemberSearch] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const [memberPage, setMemberPage] = useState(1)
    const [memberPages, setMemberPages] = useState(1)
    const [hintModal, setHintModal] = useState<IHintModal>()
    const [isMembersLoading, setIsMembersLoading] = useState(false)
    const [isUsersLoading, setIsUsersLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const listRef = useRef<HTMLDivElement>(null)

    const loadMembers = useCallback((page: number, search: string, append = false) => {
        setIsMembersLoading(true)
        return getProjectUsersWithParamsAPI(projectId, {
            page: page.toString(),
            limit: PAGE_LIMIT,
            search,
        }).then((response: IQueryToProjectUsers) => {
            setMemberPage(page)
            setMemberPages(response.pages || 1)
            setProjectUsers(prev => append ? [...prev, ...response.results] : response.results)
        }).catch(() => {
            setHintModal(getErrorHintModal('Не удалось загрузить участников проекта'))
        }).finally(() => setIsMembersLoading(false))
    }, [projectId])

    const loadUsers = useCallback((search: string) => {
        setIsUsersLoading(true)
        return getUsersAPI({
            page: '1',
            limit: USER_LIMIT,
            search,
        }).then((response: IUserQuery) => {
            setUsers(response.results)
        }).catch(() => {
            setHintModal(getErrorHintModal('Не удалось загрузить пользователей'))
        }).finally(() => setIsUsersLoading(false))
    }, [])

    useEffect(() => {
        if (!isVisible) return

        getProjectRolesAPI().then(setRoles).catch(() => {
            setHintModal(getErrorHintModal('Не удалось загрузить должности'))
        })
        loadMembers(1, '', false)
        loadUsers('')
    }, [isVisible, loadMembers, loadUsers])

    useEffect(() => {
        if (!isVisible) return

        const timeout = setTimeout(() => {
            loadMembers(1, memberSearch, false)
        }, 300)
        return () => clearTimeout(timeout)
    }, [isVisible, memberSearch, loadMembers])

    useEffect(() => {
        if (!isVisible) return

        const timeout = setTimeout(() => {
            loadUsers(userSearch)
        }, 300)
        return () => clearTimeout(timeout)
    }, [isVisible, userSearch, loadUsers])

    const projectAdmin = useMemo(() => projectUsers.find(it => it.id === null), [projectUsers])
    const usersToInvite = useMemo(() => {
        return users.filter(it => it.id !== projectAdmin?.user.id)
    }, [projectAdmin, users])

    const upsertProjectUser = (item: IUserToProject) => {
        setProjectUsers(prev => {
            const exists = prev.some(it => it.user.id === item.user.id)
            if (!exists) return [item, ...prev]
            return prev.map(it => it.user.id === item.user.id ? item : it)
        })
    }

    const saveUserRole = (userId: string | number, roleId: string | number) => {
        setIsSaving(true)
        return addProjectUserAPI(projectId, {
            user_id: userId,
            role_id: roleId,
        }).then((response: IUserToProject) => {
            upsertProjectUser(response)
            setHintModal(getSuccessHintModal('Должность сохранена'))
        }).catch((error) => {
            if (error.status === 403) {
                setHintModal(getErrorHintModal('Добавлять участников может администратор или менеджер'))
                return
            }
            setHintModal(getErrorHintModal('Не удалось сохранить должность'))
        }).finally(() => setIsSaving(false))
    }

    const handleInvite = () => {
        if (!selectedUserId || !selectedRoleId) {
            setHintModal(getErrorHintModal('Выберите пользователя и должность'))
            return
        }

        saveUserRole(selectedUserId, selectedRoleId).then(() => {
            setSelectedUserId('')
            setSelectedRoleId('')
        })
    }

    const handleScroll = () => {
        const list = listRef.current
        if (!list || isMembersLoading || memberPage >= memberPages) return

        const distanceToBottom = list.scrollHeight - list.scrollTop - list.clientHeight
        if (distanceToBottom < 80) {
            loadMembers(memberPage + 1, memberSearch, true)
        }
    }

    return (
        <Modal title={'Участники проекта'} hint={hintModal}
               isVisible={isVisible} setIsVisible={setIsVisible}
               className={cls(cl.block, className)}>
            <div className={cl.grid}>
                <section className={cl.invite}>
                    <div>
                        <h3 className={cl.subtitle}>Пригласить</h3>
                        <p className={cl.muted}>Найдите пользователя и назначьте должность в проекте.</p>
                    </div>

                    <input value={userSearch}
                           onChange={e => setUserSearch(e.target.value)}
                           placeholder={'Поиск пользователей'}
                           className={cl.input}/>

                    <select value={selectedUserId}
                            onChange={e => setSelectedUserId(e.target.value)}
                            className={cl.select}>
                        <option value={''}>{isUsersLoading ? 'Загрузка...' : 'Выберите пользователя'}</option>
                        {usersToInvite.map(user => (
                            <option value={user.id} key={user.id}>
                                {getDisplayName(user)}{user.username ? ` · ${user.username}` : ''}
                            </option>
                        ))}
                    </select>

                    <select value={selectedRoleId}
                            onChange={e => setSelectedRoleId(e.target.value)}
                            className={cl.select}>
                        <option value={''}>Выберите должность</option>
                        {roles.map(role => (
                            <option value={role.id} key={role.id}>{role.name}</option>
                        ))}
                    </select>

                    <Button.Green title={'Сохранить'}
                                  type={ETypeButton.BUTTON}
                                  onClick={handleInvite}
                                  isLoading={isSaving}
                                  titleLoading={'Сохранение...'}/>
                </section>

                <section className={cl.members}>
                    <div className={cl.memberHeader}>
                        <div>
                            <h3 className={cl.subtitle}>Все участники</h3>
                            <p className={cl.muted}>Роль можно изменить прямо в списке.</p>
                        </div>
                        <input value={memberSearch}
                               onChange={e => setMemberSearch(e.target.value)}
                               placeholder={'Поиск в проекте'}
                               className={cls(cl.input, cl.memberSearch)}/>
                    </div>

                    <div className={cl.list} onScroll={handleScroll} ref={listRef}>
                        {projectUsers.map(item => (
                            <div className={cl.user} key={`${item.id}-${item.user.id}`}>
                                <User user={item.user}
                                      subtitle={item.user.username || 'Участник проекта'}
                                      variant={'compact'}/>
                                <select value={item.role.id}
                                        disabled={item.id === null || isSaving}
                                        onChange={e => saveUserRole(item.user.id, e.target.value)}
                                        className={cl.roleSelect}>
                                    {roles.map(role => (
                                        <option value={role.id} key={role.id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {isMembersLoading && <div className={cl.state}>Загрузка...</div>}
                        {!isMembersLoading && projectUsers.length === 0 && (
                            <div className={cl.state}>Участники не найдены</div>
                        )}
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default ProjectUserModal;
