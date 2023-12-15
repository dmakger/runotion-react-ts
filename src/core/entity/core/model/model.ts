export interface IQuery {
    count: number
    pages: number
    next: string
    previous: string,
    currentPage: number,
    results: any[]
}