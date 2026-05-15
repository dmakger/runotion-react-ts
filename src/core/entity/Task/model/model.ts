import {IProject} from "core/entity/Project/model/model";
import {IUser} from "core/entity/User/model/model";
import {IQuery} from "core/entity/core/model/model";
import {ISection} from "core/widget/Section/model/model";

export interface ITaskCategory {
    id: number
    project: number
    name: string
    color: string
    created_at: string
}

// TASK
export interface ITask {
    id: number
    director: IUser
    project: IProject
    name: string
    code: string
    created_at: string
    deadline?: string
    completed_at?: string | null
    responsible?: IUser,
    collaborators?: IUser[],
    observers?: IUser[],
    category?: ITaskCategory | null,
    section?: ISection | null,
}


// QUERY TASK
export interface IQueryToTask extends IQuery{
    results: ITask[]
}

// ТИПЫ ПРЕДСТАВЛЕНИЙ [TASK]
export enum ETypeTask {
    LIST,
    KANBAN
}

export interface TaskPageProps {
    type: ETypeTask
}
