import {getHeaders, getParams, getURL, request} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";
import { TASK_API } from "core/entity/Task/api/TaskApi";

const _getChecklistURL = (taskId?: number, checklistId?: number) => {
    if (taskId === undefined && checklistId)
        return  `${TASK_API}/checklist/${checklistId}`
    return `${TASK_API}/${taskId}/checklist`
}

// ALL
export const getChecklist = async (taskId: number, params?: IArgsRequest["params"]) => {
    const url = `${_getChecklistURL(taskId)}/${getParams(params)}`
    return await request({
        method: 'GET',
        url: getURL(url, params),
        headers: getHeaders(true),
    } as IRequest)
}

// CREATE
export const createChecklistAPI = async (taskId: number) => {
    const url = `${_getChecklistURL(taskId)}/create/`
    return await request({
        method: 'POST',
        url: getURL(url),
        headers: getHeaders(true),
        body: undefined
    } as IRequest)
}

// UPDATE
export const updateChecklist = async (checklistId: number, {body, params}: IArgsRequest) => {
    const url = `${_getChecklistURL(undefined, checklistId)}/update/${getParams(params)}`
    return await request({
        method: 'PUT',
        url: getURL(url, params),
        headers: getHeaders(true),
        body: JSON.stringify(body)
    } as IRequest)
}

// DELETE
export const deleteChecklistAPI = async (checklistId: number) => {
    const url = `${_getChecklistURL(undefined, checklistId)}/delete/`
    return await request({
        method: 'DELETE',
        url: getURL(url),
        headers: getHeaders(true),
        body: undefined
    } as IRequest)
}