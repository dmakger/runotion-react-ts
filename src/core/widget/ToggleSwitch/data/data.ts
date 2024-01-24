import {
    PROJECT__KANBAN__MAIN_URL,
    PROJECT__TASK__MAIN_URL,
    TASK__MAIN_URL,
    TASK_GANT__MAIN_URL
} from "main/router/urlRouter";
import {IToggleSwitch} from "core/widget/ToggleSwitch/model/model";
import {ETypeTask} from "core/entity/Task/model/model";


// TASK
export const TaskListItemToggleSwitch: IToggleSwitch = {
    key: ETypeTask.LIST,
    title: 'Список',
    to: TASK__MAIN_URL,
    isActive: false
}


export const TaskGantItemToggleSwitch: IToggleSwitch = {
    key: ETypeTask.KANBAN,
    title: 'Канбан',
    to: TASK_GANT__MAIN_URL,
    isActive: false
}



export const DATA_TASK__TOGGLE_SWITCH: IToggleSwitch[] = [
    TaskListItemToggleSwitch,
    TaskGantItemToggleSwitch,
]


// PROJECT TASKS

// TASK
export const ProjectTaskListItemToggleSwitch: IToggleSwitch = {
    key: ETypeTask.LIST,
    title: 'Список',
    to: PROJECT__TASK__MAIN_URL,
    isActive: false
}

export const ProjectKanbanListItemToggleSwitch: IToggleSwitch = {
    key: ETypeTask.KANBAN,
    title: 'Канбан',
    to: PROJECT__KANBAN__MAIN_URL,
    isActive: false
}



export const DATA_PROJECT_TASK__TOGGLE_SWITCH: IToggleSwitch[] = [
    ProjectTaskListItemToggleSwitch,
    ProjectKanbanListItemToggleSwitch
]