import {IFunctionTopLine} from "core/widget/FunctionTopLine/model/model";
import ToggleSwitch from "core/widget/ToggleSwitch/ui/ToggleSwitch";
import CreateTask from "core/entity/Task/ui/create/CreateTask";
import React from "react";

// TOGGLE SWITCH
export const TOGGLE_SWITCH__FUNCTION_TOP_LINE: IFunctionTopLine = {
    key: 'toggleSwitch',
    element: <ToggleSwitch />,
    isVisible: false
}

// CREATE TASK
export const CREATE_TASK__FUNCTION_TOP_LINE: IFunctionTopLine = {
    key: 'createTask',
    isVisible: true,
    element: <CreateTask />
}

export const DATA_TOGGLE_SWITCH__FUNCTION_TOP_LINE: IFunctionTopLine[] = [
    TOGGLE_SWITCH__FUNCTION_TOP_LINE,
]

export const DATA_TASK__FUNCTION_TOP_LINE: IFunctionTopLine[] = [
    TOGGLE_SWITCH__FUNCTION_TOP_LINE,
    CREATE_TASK__FUNCTION_TOP_LINE,
]