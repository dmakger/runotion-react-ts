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

export interface ITaskAttachment {
    id: number
    user?: IUser | null
    name: string
    size: number
    content_type: string
    file: string
    file_url: string
    created_at: string
}

// TASK
export interface ITask {
    id: number
    director: IUser
    project: IProject
    name: string
    description?: string
    code: string
    created_at: string
    deadline?: string
    completed_at?: string | null
    responsible?: IUser,
    collaborators?: IUser[],
    observers?: IUser[],
    category?: ITaskCategory | null,
    section?: ISection | null,
    attachments?: ITaskAttachment[],
}

export interface ITaskComment {
    id: number
    user: IUser
    text: string
    attachments?: ITaskAttachment[]
    created_at: string
}

export interface INotification {
    id: number
    type: string
    title: string
    text: string
    is_read: boolean
    created_at: string
    actor?: IUser | null
    project?: IProject | null
    task?: {
        id: number
        name: string
        code: string
        project: number
    } | null
}


// QUERY TASK
export interface IQueryToTask extends IQuery{
    results: ITask[]
}

// ТИПЫ ПРЕДСТАВЛЕНИЙ [TASK]
export enum ETypeTask {
    LIST,
    KANBAN,
    STATISTIC
}

export interface TaskPageProps {
    type: ETypeTask
}
