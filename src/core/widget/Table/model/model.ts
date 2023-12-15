export interface ICellTable {
    id?: number
    title?: string,
    image?: string,
    isEmpty?: boolean
}

export type ILineTable = {
    id?: number
    line: ICellTable[],
}

export type ITable = {
    header: ILineTable
    content?: ILineTable[]
    onLineClick?: Function
}