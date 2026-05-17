export interface ICellTable {
    id?: number
    title?: string,
    image?: string,
    entity?: 'user' | 'project',
    color?: string,
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
    pagination?: ITablePagination
    emptyText?: string
}

export type ITablePagination = {
    count: number
    pages: number
    currentPage: number
    limit: number
    limits?: number[]
    onPageChange: (page: number) => void
    onLimitChange: (limit: number) => void
}
