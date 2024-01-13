import {ICellTable, ILineTable} from "core/widget/Table/model/model";

export const PROJECT__PROJECT_TABLE: ICellTable = {
    title: 'Проект'
}


export const ADMIN__PROJECT_TABLE: ICellTable = {
    title: 'Руководитель'
}


export const ROLE__PROJECT_TABLE: ICellTable = {
    title: 'Роль'
}

export const DATA_HEADER_PROJECT_TABLE: ILineTable = {
    id: -1,
    line: [
        PROJECT__PROJECT_TABLE,
        ADMIN__PROJECT_TABLE,
        ROLE__PROJECT_TABLE,
    ]
}