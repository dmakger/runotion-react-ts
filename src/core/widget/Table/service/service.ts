import {ICellTable} from "core/widget/Table/model/model";

export interface ObjToCellTableProps {
    obj: ICellTable,
    defaultText?: string
}

export const objToCellTable = ({obj, defaultText}: ObjToCellTableProps) => {
    let _image = obj.image
    return {
        id: obj.id,
        title: obj.title ? obj.title : defaultText,
        image: _image,
        isEmpty: obj.isEmpty === undefined ? !obj.title : obj.isEmpty,
    } as ICellTable
}