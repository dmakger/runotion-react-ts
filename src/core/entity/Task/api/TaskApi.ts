import {getHeaders, getURL, request, URL_API} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";

export const TASK_API = URL_API + '/task'

// TASKS
export const getTasksAPI = async (params?: IArgsRequest["params"], body?: IArgsRequest["body"]) => {
    const url = `${TASK_API}/all/`
    console.log(body)
    return await request({
        method: 'POST',
        url: getURL(url, params),
        headers: getHeaders(true),
        body: JSON.stringify(body),
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


// CREATE TASK
export const createTaskAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/create/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


// UPDATE TASK
export const updateTaskAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/${body!.id}/update`
    return await request({
        method: 'PUT',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


// ADD TASK IN SECTION
export const addTaskInSectionAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/${body!.taskId}/add/section/${body!.sectionId}/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

