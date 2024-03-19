import { IColor } from "core/entity/core/model/model"

export interface ISection {
    id: number
    name: string
    position: number
    body?: any[]
    color?: IColor
}

export enum ETypeSection {
    SECTION = 'section',
    ITEM = 'item',
    ADD_ITEM = 'addItem',
}


export interface ISectionFunction {
    // onItemClick: (item: any) => void
    // onAddItemClick: (section: ISection) => void
    onItemClick: (itemId: number) => void
    onAddItemClick: (section: ISection) => void
}