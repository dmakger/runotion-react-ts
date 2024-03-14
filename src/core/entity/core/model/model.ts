export interface IQuery {
    count: number
    pages: number
    next: string
    previous: string,
    currentPage: number,
    results: any[]
}

export interface IImportanceLevel {
    id: number
    name: string
    value: number
}

export interface IColor {
    id: number
    name: string
    value: string
}