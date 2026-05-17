import React, {useEffect, useMemo, useState} from 'react';
import {ChartItemLeftMenu} from "core/entity/LeftMenu/data/data";
import {useDispatch} from "react-redux";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {PathSlice} from "core/entity/Path/slice/slice";
import {
    chartFiltersAPI,
    taskByQuarterAPI,
    taskStatusAPI,
    tasksByDirectorAPI,
    tasksByProjectAPI,
    tasksWithDeviationAPI,
    taskToPerformersAPI
} from "core/widget/Chart/api/ChartApi";
import {tasksWithDeviationToChat} from "core/charts/TasksWithDeviation/service/service";
import {taskByQuarterToChat} from "core/charts/TaskByQuarter/service/service";
import {taskToPerformersToChat} from "core/charts/TaskToPerformers/service/service";
import {IChartPayload, ITaskByQuarter, ITasksWithDeviation} from "core/widget/Chart/model/model";
import BarChartWrapper from "core/widget/Chart/ui/Bar/BarChartWrapper";
import LineChartWrapper from "core/widget/Chart/ui/Line/LineChartWrapper";
import PieChartWrapper from "core/widget/Chart/ui/Pie/PieChartWrapper";
import {EColors} from "core/data/data";
import {IProject} from "core/entity/Project/model/model";
import {IUser} from "core/entity/User/model/model";
import SmartSelect, {ISmartSelectOption} from "core/components/SmartSelect/SmartSelect";
import cl from './_ChartPage.module.scss'
import {getUserDepartmentName, getUserDisplayName} from "core/entity/User/service/service";

interface IChartState {
    deviation?: IChartPayload[]
    quarters?: IChartPayload[]
    performers?: IChartPayload[]
    statuses?: IChartPayload[]
    byProject?: IChartPayload[]
    byDirector?: IChartPayload[]
}

interface IFilterResponse {
    projects: IProject[]
    users: IUser[]
}

const taskCountKey = 'Количество задач'

const STATUS_OPTIONS: ISmartSelectOption[] = [
    {value: 'active', label: 'В работе', subtitle: 'Незавершенные задачи'},
    {value: 'completed', label: 'Завершенные', subtitle: 'Задачи с датой завершения'},
    {value: 'overdue', label: 'Просроченные', subtitle: 'Дедлайн уже прошел'},
    {value: 'without_deadline', label: 'Без срока', subtitle: 'Задачи без дедлайна'},
]

const statusToChart = (data: Record<string, number>) => [
    {name: 'В работе', [taskCountKey]: data.active || 0},
    {name: 'Завершено', [taskCountKey]: data.completed || 0},
    {name: 'Просрочено', [taskCountKey]: data.overdue || 0},
    {name: 'Без срока', [taskCountKey]: data.without_deadline || 0},
]

const amountListToChart = (data: {name: string, amount: number}[]) => {
    return data.map(it => ({
        name: it.name || 'Без названия',
        [taskCountKey]: it.amount,
        text: `${it.name || 'Без названия'}: ${it.amount}`,
    }))
}

const mergeById = <T extends {id: number}>(items: T[], selected: T[]) => {
    const ids = new Set<number>()
    return [...selected, ...items].filter(item => {
        if (ids.has(item.id)) return false
        ids.add(item.id)
        return true
    })
}

interface ChartPageProps {
    projectId?: number
    embedded?: boolean
}

const ChartPage = ({projectId, embedded = false}: ChartPageProps) => {
    const dispatch = useDispatch();
    const [projectOptions, setProjectOptions] = useState<IProject[]>([])
    const [userOptions, setUserOptions] = useState<IUser[]>([])
    const [selectedProjects, setSelectedProjects] = useState<IProject[]>([])
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
    const [selectedStatus, setSelectedStatus] = useState('')
    const [projectSearch, setProjectSearch] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [charts, setCharts] = useState<IChartState>({})
    const [error, setError] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const selectedProjectIds = useMemo(() => selectedProjects.map(it => it.id), [selectedProjects])
    const activeProjectIds = useMemo(() => projectId ? [projectId] : selectedProjectIds, [projectId, selectedProjectIds])
    const selectedUserIds = useMemo(() => selectedUsers.map(it => it.id), [selectedUsers])

    const projectSelectOptions: ISmartSelectOption[] = projectOptions.map(project => ({
        value: project.id,
        label: project.name,
        subtitle: project.code || 'Проект',
        image: project.image,
        entity: 'project',
    }))
    const userSelectOptions: ISmartSelectOption[] = userOptions.map(user => ({
        value: user.id,
        label: getUserDisplayName(user),
        subtitle: getUserDepartmentName(user) || user.username || 'Пользователь',
        image: user.image,
        entity: 'user',
    }))

    const filterBody = useMemo(() => ({
        projects: activeProjectIds,
        users: selectedUserIds,
        status: selectedStatus || undefined,
        levels: [],
    }), [activeProjectIds, selectedStatus, selectedUserIds])

    useEffect(() => {
        if (embedded) return
        dispatch(LeftMenuSlice.actions.setLeftMenu(ChartItemLeftMenu));
        dispatch(PathSlice.actions.setPath([{
            key: 'Chart',
            route: {path: '/chart/'},
            title: 'Статистика',
        }]));
    }, [dispatch, embedded]);

    useEffect(() => {
        chartFiltersAPI({
            projects: activeProjectIds,
            users: selectedUserIds,
            project_search: projectSearch,
            user_search: userSearch,
        }).then((response: IFilterResponse) => {
            setProjectOptions(mergeById(response.projects || [], selectedProjects))
            setUserOptions(mergeById(response.users || [], selectedUsers))
        }).catch(() => {
            setProjectOptions(selectedProjects)
            setUserOptions(selectedUsers)
        })
    }, [activeProjectIds, projectSearch, selectedProjects, selectedUserIds, selectedUsers, userSearch])

    useEffect(() => {
        setIsLoading(true)
        setError(undefined)

        Promise.all([
            tasksWithDeviationAPI(filterBody),
            taskByQuarterAPI(filterBody),
            taskToPerformersAPI(filterBody),
            taskStatusAPI(filterBody),
            tasksByProjectAPI(filterBody),
            tasksByDirectorAPI(filterBody),
        ]).then(([deviation, quarters, performers, statuses, byProject, byDirector]) => {
            setCharts({
                deviation: tasksWithDeviationToChat(taskCountKey, deviation as ITasksWithDeviation),
                quarters: taskByQuarterToChat(taskCountKey, quarters as ITaskByQuarter[]),
                performers: taskToPerformersToChat(taskCountKey, performers),
                statuses: statusToChart(statuses),
                byProject: amountListToChart(byProject),
                byDirector: amountListToChart(byDirector),
            })
        }).catch(() => {
            setError('Не удалось загрузить графики. Проверьте доступ к API и выбранные фильтры.')
            setCharts({})
        }).finally(() => setIsLoading(false))
    }, [filterBody])

    const setProjectsByIds = (ids: number[]) => {
        setSelectedProjects(projectOptions.filter(project => ids.includes(project.id)))
    }

    const setUsersByIds = (ids: number[]) => {
        setSelectedUsers(userOptions.filter(user => ids.includes(user.id)))
    }

    const clearFilters = () => {
        setSelectedProjects([])
        setSelectedUsers([])
        setSelectedStatus('')
        setProjectSearch('')
        setUserSearch('')
    }

    const activeFilterCount = (projectId ? 0 : selectedProjects.length) + selectedUsers.length + (selectedStatus ? 1 : 0)

    return (
        <div className={cl.main}>
            <div className={cl.toolbar}>
                <button className={cl.filterButton} onClick={() => setIsFilterOpen(prev => !prev)}>
                    <span className={cl.filterIcon}/>
                    Фильтры
                    {activeFilterCount > 0 && <span className={cl.badge}>{activeFilterCount}</span>}
                </button>

                <div className={cl.chips}>
                    {!projectId && selectedProjects.map(project => (
                        <button className={cl.chip} key={project.id}
                                onClick={() => setProjectsByIds(selectedProjectIds.filter(id => id !== project.id))}>
                            {project.name}
                        </button>
                    ))}
                    {selectedUsers.map(user => (
                        <button className={cl.chip} key={user.id}
                                onClick={() => setUsersByIds(selectedUserIds.filter(id => id !== user.id))}>
                            {getUserDisplayName(user)}
                        </button>
                    ))}
                    {selectedStatus && (
                        <button className={cl.chip} onClick={() => setSelectedStatus('')}>
                            {STATUS_OPTIONS.find(option => option.value === selectedStatus)?.label || selectedStatus}
                        </button>
                    )}
                </div>

                {activeFilterCount > 0 && <button className={cl.clear} onClick={clearFilters}>Сбросить</button>}
            </div>

            {isFilterOpen && (
                <div className={cl.popover}>
                    {!projectId && <SmartSelect label={'Проекты'}
                                 hint={'Можно выбрать один или несколько проектов'}
                                 value={selectedProjectIds}
                                 options={projectSelectOptions}
                                 multiple
                                 onChange={setProjectsByIds}
                                 placeholder={'Все проекты'}
                                 searchPlaceholder={'Найти проект'}
                                 searchValue={projectSearch}
                                 onSearchChange={setProjectSearch}
                                 emptyText={'Проекты не найдены'}
                                 className={cl.filterColumn}/>}

                    <SmartSelect label={'Пользователи'}
                                 hint={'Список зависит от выбранных проектов'}
                                 value={selectedUserIds}
                                 options={userSelectOptions}
                                 multiple
                                 onChange={setUsersByIds}
                                 placeholder={'Все пользователи'}
                                 searchPlaceholder={'Найти пользователя'}
                                 searchValue={userSearch}
                                 onSearchChange={setUserSearch}
                                 emptyText={'Пользователи не найдены'}
                                 className={cl.filterColumn}/>

                    <SmartSelect label={'Статус'}
                                 hint={'Ограничивает все графики'}
                                 value={selectedStatus}
                                 options={STATUS_OPTIONS}
                                 onChange={(value) => setSelectedStatus(String(value))}
                                 placeholder={'Все задачи'}
                                 searchable={false}
                                 className={cl.filterColumn}/>
                </div>
            )}

            {error && <div className={cl.error}>{error}</div>}

            <div className={cl.grid}>
                <PieChartWrapper title={'Статус задач'} dataKey={taskCountKey} data={isLoading ? undefined : charts.statuses}/>
                <BarChartWrapper title={'Задачи по проектам'} dataKey={taskCountKey} data={isLoading ? undefined : charts.byProject} fill={EColors.Green}/>
                <BarChartWrapper title={'Задачи по постановщикам'} dataKey={taskCountKey} data={isLoading ? undefined : charts.byDirector} fill={EColors.Orange}/>
                <BarChartWrapper title={'Отклонение по срокам'} dataKey={taskCountKey} data={isLoading ? undefined : charts.deviation}/>
                <LineChartWrapper title={'Создание задач по кварталам'} dataKey={taskCountKey} data={isLoading ? undefined : charts.quarters} fill={EColors.Green}/>
                <PieChartWrapper title={'Задачи по исполнителям'} dataKey={taskCountKey} data={isLoading ? undefined : charts.performers}/>
            </div>
        </div>
    );
};

export default ChartPage;
