import { IInfoCompletedSubtask, ISubtask } from "core/entity/Subtask/model/model";
import { ITask } from "core/entity/Task/model/model";
import {IUser} from "core/entity/User/model/model";
import {IQuery} from "core/entity/core/model/model";

export interface IChecklist {
    id: number
    user: IUser
    task: ITask
    name: string
    position?: number
    created_at: string
    completed_at?: string
    infoCompletedSubtask?: IInfoCompletedSubtask
    subtasks?: ISubtask[]
}

export interface IQueryToChecklist extends IQuery{
    results: IChecklist[]
}