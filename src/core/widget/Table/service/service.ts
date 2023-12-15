import {ICellTable} from "core/widget/Table/model/model";

export interface ObjToCellTableProps {
    obj: ICellTable,
    defaultText?: string
}

export const objToCellTable = ({obj, defaultText}: ObjToCellTableProps) => {
    return {
        id: obj.id,
        title: obj.title ? obj.title : defaultText,
        image: obj.image,
        isEmpty: obj.isEmpty === undefined ? !obj.title : obj.isEmpty,
    } as ICellTable
}