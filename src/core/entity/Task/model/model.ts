import {IProject} from "core/entity/Project/model/model";
import {IUser} from "core/entity/User/model/model";
import {IQuery} from "core/entity/core/model/model";

// TASK
export interface ITask {
    id: number
    director: IUser
    project: IProject
    name: string
    code: string
    created_at: string
    deadline?: string
    completed_at?: string
    responsible?: IUser,
    collaborators?: IUser[],
    observers?: IUser[],
}


// QUERY TASK
export interface IQueryToTask extends IQuery{
    results: ITask[]
}
