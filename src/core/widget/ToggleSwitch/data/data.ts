import {TASK__MAIN_URL, TASK_GANT__MAIN_URL} from "main/router/urlRouter";
import {IToggleSwitch} from "core/widget/ToggleSwitch/model/model";


export const TaskListItemToggleSwitch: IToggleSwitch = {
    title: 'Список',
    to: TASK__MAIN_URL,
    isActive: false
}


export const TaskGantItemToggleSwitch: IToggleSwitch = {
    title: 'Кабан',
    to: TASK_GANT__MAIN_URL,
    isActive: false
}



export const DATA_TASK__TOGGLE_SWITCH: IToggleSwitch[] = [
    TaskListItemToggleSwitch,
    TaskGantItemToggleSwitch,
]