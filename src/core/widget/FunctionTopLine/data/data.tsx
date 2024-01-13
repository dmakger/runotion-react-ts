import {IFunctionTopLine} from "core/widget/FunctionTopLine/model/model";
import ToggleSwitch from "core/widget/ToggleSwitch/ui/ToggleSwitch";
import CreateTask from "core/entity/Task/ui/create/CreateTask";
import React from "react";
import CreateProject from "core/entity/Project/ui/create/CreateProject";

// TOGGLE SWITCH
export const TOGGLE_SWITCH__FUNCTION_TOP_LINE: IFunctionTopLine = {
    key: 'toggleSwitch',
    element: <ToggleSwitch />,
    isVisible: false
}


export const DATA_TOGGLE_SWITCH__FUNCTION_TOP_LINE: IFunctionTopLine[] = [
    TOGGLE_SWITCH__FUNCTION_TOP_LINE,
]



// ===============================
//  TASK
// CREATE TASK
export const CREATE_TASK__FUNCTION_TOP_LINE: IFunctionTopLine = {
    key: 'createTask',
    isVisible: true,
    element: <CreateTask />
}

export const DATA_TASK__FUNCTION_TOP_LINE: IFunctionTopLine[] = [
    TOGGLE_SWITCH__FUNCTION_TOP_LINE,
    CREATE_TASK__FUNCTION_TOP_LINE,
]


// ===============================
// PROJECT
// CREATE PROJECT
export const CREATE_PROJECT__FUNCTION_TOP_LINE: IFunctionTopLine = {
    key: 'createProject',
    isVisible: true,
    element: <CreateProject />
}

export const DATA_PROJECT__FUNCTION_TOP_LINE: IFunctionTopLine[] = [
    CREATE_PROJECT__FUNCTION_TOP_LINE,
]