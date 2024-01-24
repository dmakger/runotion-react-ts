import React, {useCallback, useEffect, useState} from 'react';
import {IProject} from "core/entity/Project/model/model";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getProjectByIdAPI} from "core/entity/Project/api/ProjectApi";
import {PROJECT__ROOT, PROJECT__TASK__ROOT} from "main/router/routes/projectRoot";
import {TRoute, TRouteArgs} from "core/entity/Route/model/model";
import {swapArgsTRoute, swapArgUrl} from "main/router/service/service";
import {PathSlice} from "core/entity/Path/slice/slice";
import {FunctionTopLineSlice} from "core/widget/FunctionTopLine/slice/slice";
import {DATA_TASK__FUNCTION_TOP_LINE} from "core/widget/FunctionTopLine/data/data";
import {DATA_TASK} from "core/widget/FunctionTopLine/data/dataToKey";
import {ToggleSwitchSlice} from "core/widget/ToggleSwitch/slice/slice";
import {DATA_PROJECT_TASK__TOGGLE_SWITCH} from "core/widget/ToggleSwitch/data/data";
import {ETypeTask, TaskPageProps} from "core/entity/Task/model/model";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {ProjectItemLeftMenu} from "core/entity/LeftMenu/data/data";
import ProjectTaskPage from "main/pages/Project/pages/task/pages/list/ProjectTaskPage";
import KanbanProjectTaskPage from "main/pages/Project/pages/task/pages/kanban/KanbanProjectTaskPage";

interface ProjectLayoutTaskPageProps extends TaskPageProps{}

const ProjectLayoutTaskPage = ({type}: ProjectLayoutTaskPageProps) => {
    // STATE
    const [project, setProject] = useState<IProject>()

    // PATH
    let { projectId } = useParams();


    // ===={ EFFECT }====
    // Получение проекта [project]
    useEffect(() => {
        if (!projectId) return

        getProjectByIdAPI(projectId).then(r => {
            setProject(r)
        })
    }, [projectId])


    // ===={ FUNC }====
    // Обновление [PROJECT__TASK__ROOT]
    const getUpdatedUrl = useCallback((root: TRoute = PROJECT__TASK__ROOT) => {
        const args: TRouteArgs = {};
        if (project !== undefined) args['titlePath'] = project.name;
        if (root.route.path && projectId !== undefined) {
            const newUrl = swapArgUrl(root.route.path, [{ key: 'projectId', value: projectId }]);
            args['route'] = { ...args.route, path: newUrl };
        }
        return swapArgsTRoute(root, args);
    }, [project, projectId]);

    // Обновление [DATA_PROJECT_TASK__TOGGLE_SWITCH]
    const getUpdatedUrlToggleSwitch = useCallback(() => {
        const urls = DATA_PROJECT_TASK__TOGGLE_SWITCH
        if (projectId === undefined)
            return urls
        const data = [{key: 'projectId', value: projectId}]
        return urls.map(it => ({
            ...it,
            to: swapArgUrl(it.to, data),
            isActive: it.key === type,
        }))
    }, [projectId, type])


    // ===={ DISPATCH }====
    const dispatch = useDispatch();

    // Обновление данных
    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(ProjectItemLeftMenu), {refetchOnMountOrArgChange: true});
        // dispatch(CurrentEntitySlice.actions.set({...DATA_IN_PROJECT__CURRENT_ENTITY, data: project}), {refetchOnMountOrArgChange: true});

        dispatch(PathSlice.actions.setPath([PROJECT__ROOT, getUpdatedUrl()]), {refetchOnMountOrArgChange: true});

        dispatch(FunctionTopLineSlice.actions.setFunctionTopLine(DATA_TASK__FUNCTION_TOP_LINE), {refetchOnMountOrArgChange: true});
        dispatch(FunctionTopLineSlice.actions.swapVisibleByKey(DATA_TASK), {refetchOnMountOrArgChange: true});

        dispatch(ToggleSwitchSlice.actions.setToggleList(getUpdatedUrlToggleSwitch()));

    }, [dispatch, getUpdatedUrl, getUpdatedUrlToggleSwitch, project]);


    // ===={ RETURN }====
    if (type === ETypeTask.LIST)
        return <ProjectTaskPage />
    return (
        <KanbanProjectTaskPage />
    );
};

export default ProjectLayoutTaskPage;