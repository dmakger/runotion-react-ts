import {IUser} from "core/entity/User/model/model";

export interface IUsersBlockSidebarTaskData {
    title: string,
    data: IUser[] | null[] | undefined[]
}