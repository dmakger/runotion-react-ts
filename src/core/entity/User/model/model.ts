import {IDepartment} from "core/entity/Department/model/model";
import {IProject} from "core/entity/Project/model/model";

export interface IUser {
    id: number
    name: string
    username: string
    department?: IDepartment | string | null
    image?: string
    projects?: IProject[]
    stats?: IUserStats
}

export interface IUserStats {
    projects: number
    directed_tasks: number
    assigned_tasks: number
    completed_tasks: number
    active_tasks: number
}

export interface ILoginRequest {
    username: string
    password: string
}

export interface IAuthResponse {
    access: string
    refresh: string
}
