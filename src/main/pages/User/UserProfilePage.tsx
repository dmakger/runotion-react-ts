import React, {useEffect, useMemo, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import EntityImage from "core/components/EntityImage/EntityImage";
import {IUser} from "core/entity/User/model/model";
import {getUserByIdAPI, updateUserProfileAPI} from "core/entity/User/api/UserAPI";
import {getUserDepartmentName, getUserDisplayName} from "core/entity/User/service/service";
import {PathSlice} from "core/entity/Path/slice/slice";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {DATA_LEFT_MENU} from "core/entity/LeftMenu/data/data";
import {FunctionTopLineSlice} from "core/widget/FunctionTopLine/slice/slice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "core/storage/hooks";
import cl from './_UserProfilePage.module.scss'

const UserProfilePage = () => {
    const {userId} = useParams()
    const dispatch = useDispatch()
    const currentUser = useAppSelector(state => state.user)
    const [user, setUser] = useState<IUser>()
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')

    const displayName = user ? getUserDisplayName(user) : 'Пользователь'
    const department = user ? getUserDepartmentName(user) : ''
    const stats = user?.stats
    const projects = useMemo(() => user?.projects || [], [user?.projects])
    const canEdit = currentUser.id > 0 && user?.id === currentUser.id

    const updateImage = (file?: File) => {
        if (!file || !user) return
        const formData = new FormData()
        formData.append('image', file)
        setIsUploading(true)
        updateUserProfileAPI(user.id, formData)
            .then(response => setUser(prev => prev ? {...prev, image: response.image || prev.image} : prev))
            .catch(() => setError('Не удалось обновить картинку профиля'))
            .finally(() => setIsUploading(false))
    }

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(DATA_LEFT_MENU[0]))
        dispatch(FunctionTopLineSlice.actions.setFunctionTopLine([]))
    }, [dispatch])

    useEffect(() => {
        dispatch(PathSlice.actions.setPath([
            {key: 'userProfile', title: displayName, titlePath: displayName, route: {path: `/user/${userId}`}},
        ]))
    }, [dispatch, displayName, userId])

    useEffect(() => {
        if (!userId) return

        setIsLoading(true)
        setError('')
        getUserByIdAPI(userId)
            .then(setUser)
            .catch(() => setError('Не удалось загрузить профиль пользователя'))
            .finally(() => setIsLoading(false))
    }, [userId])

    if (isLoading) {
        return <div className={cl.state}>Загрузка профиля...</div>
    }

    if (error) {
        return <div className={cl.state}>{error}</div>
    }

    if (!user) {
        return null
    }

    return (
        <div className={cl.page}>
            <section className={cl.hero}>
                <div className={cl.header}>
                    <EntityImage src={user.image} title={displayName} className={cl.avatar}/>
                    {canEdit &&
                        <label className={cl.avatarUpload}>
                            {isUploading ? 'Загрузка...' : 'Сменить'}
                            <input type="file"
                                   accept="image/*"
                                   onChange={(event) => updateImage(event.target.files?.[0])}/>
                        </label>
                    }
                    <div className={cl.identity}>
                        <div className={cl.status}>В команде Runotion</div>
                        <h2>{displayName}</h2>
                        <div className={cl.meta}>
                            {user.username && <span>@{user.username}</span>}
                            {department && <span>{department}</span>}
                        </div>
                    </div>
                </div>
                <div className={cl.quickStats}>
                    <div>
                        <strong>{stats?.projects || 0}</strong>
                        <span>проектов</span>
                    </div>
                    <div>
                        <strong>{stats?.assigned_tasks || 0}</strong>
                        <span>задач</span>
                    </div>
                    <div>
                        <strong>{stats?.completed_tasks || 0}</strong>
                        <span>завершено</span>
                    </div>
                </div>
            </section>

            <div className={cl.grid}>
                <section className={cl.panel}>
                    <h3>Профиль</h3>
                    <div className={cl.infoList}>
                        <div>
                            <span>Имя</span>
                            <strong>{displayName}</strong>
                        </div>
                        <div>
                            <span>Логин</span>
                            <strong>{user.username || 'Не указан'}</strong>
                        </div>
                        <div>
                            <span>Отдел</span>
                            <strong>{department || 'Не указан'}</strong>
                        </div>
                    </div>
                </section>

                <section className={cl.panel}>
                    <h3>Работа</h3>
                    <div className={cl.statsGrid}>
                        <div><strong>{stats?.directed_tasks || 0}</strong><span>поставлено</span></div>
                        <div><strong>{stats?.active_tasks || 0}</strong><span>активно</span></div>
                        <div><strong>{stats?.assigned_tasks || 0}</strong><span>в участии</span></div>
                        <div><strong>{stats?.completed_tasks || 0}</strong><span>готово</span></div>
                    </div>
                </section>

                <section className={cl.panelWide}>
                    <h3>Проекты</h3>
                    {projects.length > 0 ? (
                        <div className={cl.projectList}>
                            {projects.map(project => (
                                <Link to={`/project/${project.id}/task/list`} className={cl.project} key={project.id}>
                                    <EntityImage src={project.image} title={project.name} className={cl.projectImage}/>
                                    <div>
                                        <strong>{project.name}</strong>
                                        <span>{project.code || 'Проект'}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className={cl.empty}>Пока нет проектов</div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default UserProfilePage;
