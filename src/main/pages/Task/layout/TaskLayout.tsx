import React, {ReactNode, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useActionCreators} from "core/storage/hooks";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {TaskItemLeftMenu} from "core/entity/LeftMenu/data/data";
import {PathSlice} from "core/entity/Path/slice/slice";
import {TASK__ROOT} from "main/router/routes/taskRoot";
import {DATA_TASK__TOGGLE_SWITCH} from "core/widget/ToggleSwitch/data/data";
import {DATA_TASK} from "core/widget/FunctionTopLine/data/dataToKey";
import {FunctionTopLineSlice} from "core/widget/FunctionTopLine/slice/slice";
import {DATA_TASK__FUNCTION_TOP_LINE} from "core/widget/FunctionTopLine/data/data";

interface TaskLayoutProps {
    children?: ReactNode
}

const TaskLayout = ({children}: TaskLayoutProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(TaskItemLeftMenu), {refetchOnMountOrArgChange: true});
        dispatch(PathSlice.actions.setPath([TASK__ROOT]), {refetchOnMountOrArgChange: true});

        dispatch(FunctionTopLineSlice.actions.setFunctionTopLine(DATA_TASK__FUNCTION_TOP_LINE), {refetchOnMountOrArgChange: true});
        dispatch(FunctionTopLineSlice.actions.swapVisibleByKey(DATA_TASK), {refetchOnMountOrArgChange: true});

    }, [dispatch]);

    useActionCreators().setToggleList(DATA_TASK__TOGGLE_SWITCH)

    return (
        <>
            {children}
        </>
    );
};

export default TaskLayout;