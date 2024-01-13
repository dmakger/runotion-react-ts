import {IUser} from "core/entity/User/model/model";
import {IImportanceLevel} from "core/entity/core/model/model";

export interface IProject {
    id: number
    admin: IUser
    name: string
    code: string
    created_at: string
    image?: string
    role?: IRoleProject
}

export interface IRoleProject {
    id: number
    level: IImportanceLevel
    name: string
}
