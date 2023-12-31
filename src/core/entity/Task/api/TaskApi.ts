import {getHeaders, getURL, request, URL_API} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";

export const TASK_API = URL_API + '/task'

// TASKS
export const getTasks = async (params: IArgsRequest["params"]) => {
    const url = `${TASK_API}/all/`
    return await request({
        method: 'GET',
        url: getURL(url, params),
        headers: getHeaders(true),
    } as IRequest)
}

// DETAIL TASK
export const getDetailTask = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/${body!.id}/`
    return await request({
        method: 'GET',
        url: url,
        headers: getHeaders(true),
    } as IRequest)
}


// DETAIL TASK
export const createTaskAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/create/`
    return await request({
        method: 'CREATE',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}