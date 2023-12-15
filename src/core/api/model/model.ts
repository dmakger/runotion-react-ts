export enum EVariantKeyParam {
    LIMIT = 'limit',
    ORDERING = 'ordering',
}

export type IParams  = Record<EVariantKeyParam, string>

export interface IArgsRequest {
    body?: Record<string, any>,
    headers?: Record<string, string>
    params?: IParams
}


export interface IRequest {
    method: string,
    url: string,
    body?: string,
    headers?: Record<string, string>
    params?: IParams
}