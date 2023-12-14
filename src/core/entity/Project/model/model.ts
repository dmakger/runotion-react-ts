import {IUser} from "core/entity/User/model/model";

export interface IProject {
    id: number
    admin: IUser
    name: string
    code: string
    created_at: string
    image?: string
}