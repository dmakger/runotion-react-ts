import {ICellTable, ILineTable} from "core/widget/Table/model/model";

export const NAME_ITEM_HEADER_TASK_TABLE: ICellTable = {
    title: 'Название'
}

export const DEADLINE_ITEM_HEADER_TASK_TABLE: ICellTable = {
    title: 'Крайний срок'
}

export const DIRECTOR_ITEM_HEADER_TASK_TABLE: ICellTable = {
    title: 'Постановщик'
}

export const RESPONSIBLE_ITEM_HEADER_TASK_TABLE: ICellTable = {
    title: 'Ответсвенный'
}

export const PROJECT_ITEM_HEADER_TASK_TABLE: ICellTable = {
    title: 'Проект'
}


export const DATA_HEADER_TASK_TABLE: ILineTable = {
    id: -1,
    line: [
        NAME_ITEM_HEADER_TASK_TABLE,
        DEADLINE_ITEM_HEADER_TASK_TABLE,
        DIRECTOR_ITEM_HEADER_TASK_TABLE,
        RESPONSIBLE_ITEM_HEADER_TASK_TABLE,
        PROJECT_ITEM_HEADER_TASK_TABLE,
    ]
}