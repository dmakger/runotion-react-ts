import {IDepartment} from "core/entity/Department/model/model";

export interface IUser {
    id: number
    name: string
    username: string
    department?: IDepartment
    image?: string
}

export interface ILoginRequest {
    username: string
    password: string
}

export interface IAuthResponse {
    access: string
    refresh: string
}