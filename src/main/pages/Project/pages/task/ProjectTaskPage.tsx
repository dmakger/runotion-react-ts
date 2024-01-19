import React, {useEffect} from 'react';
import TaskTable from "core/tables/Task/ui/TaskTable";
import {useParams} from "react-router-dom";
import { ProjectItemLeftMenu } from 'core/entity/LeftMenu/data/data';
import { LeftMenuSlice } from 'core/entity/LeftMenu/slice/slice';
import { PathSlice } from 'core/entity/Path/slice/slice';
import { useActionCreators } from 'core/storage/hooks';
import { DATA_TASK__FUNCTION_TOP_LINE } from 'core/widget/FunctionTopLine/data/data';
import { FunctionTopLineSlice } from 'core/widget/FunctionTopLine/slice/slice';
import { PROJECT__TASK__ROOT } from 'main/router/routes/projectRoot';
import { useDispatch } from 'react-redux';
import { DATA_TASK } from 'core/widget/FunctionTopLine/data/dataToKey';
import { DATA_PROJECT_TASK__TOGGLE_SWITCH } from 'core/widget/ToggleSwitch/data/data';

const ProjectTaskPage = () => {
    let { projectId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(ProjectItemLeftMenu), {refetchOnMountOrArgChange: true});
        dispatch(PathSlice.actions.setPath([PROJECT__TASK__ROOT]), {refetchOnMountOrArgChange: true});

        dispatch(FunctionTopLineSlice.actions.setFunctionTopLine(DATA_TASK__FUNCTION_TOP_LINE), {refetchOnMountOrArgChange: true});
        dispatch(FunctionTopLineSlice.actions.swapVisibleByKey(DATA_TASK), {refetchOnMountOrArgChange: true});
        
    }, [dispatch]);

    useActionCreators().setToggleList(DATA_PROJECT_TASK__TOGGLE_SWITCH)
    return (
        <TaskTable projectId={projectId ? parseInt(projectId) : undefined} />
    );
};

export default ProjectTaskPage;