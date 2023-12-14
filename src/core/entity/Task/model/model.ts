import {IProject} from "core/entity/Project/model/model";
import {IUser} from "core/entity/User/model/model";

export interface ITask {
    id: number
    director: IUser
    project: IProject
    name: string
    code: string
    created_at: string
    deadline?: string
    completed_at?: string
}