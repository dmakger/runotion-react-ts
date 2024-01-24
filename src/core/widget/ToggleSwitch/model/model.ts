import {ETypeTask} from "core/entity/Task/model/model";

export type IToggleSwitch = {
    key: ETypeTask
    title: string
    to: string
    isActive: boolean
}

export type IToggleSwitchRedux = IToggleSwitch