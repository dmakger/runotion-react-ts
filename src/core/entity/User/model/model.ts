import {IDepartment} from "core/entity/Department/model/model";

export interface IUser {
    id: number
    name: string
    department: IDepartment
    image?: string
}