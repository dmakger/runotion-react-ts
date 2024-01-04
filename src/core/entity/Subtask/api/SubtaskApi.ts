import {getHeaders, getURL, request} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";
import { TASK_API } from "core/entity/Task/api/TaskApi";

const _getSubtaskURL = (subtaskId?: number, checklistId?: number) => {
    if (subtaskId !== undefined)
        return  `${TASK_API}/subtask/${subtaskId}`
    if (checklistId !== undefined)
        return `${TASK_API}/checklist/${checklistId}/subtask`
}

// CREATE
export const createSubtaskAPI = async (checklistId: number) => {
    const url = `${_getSubtaskURL(undefined, checklistId)}/create/`
    return await request({
        method: 'POST',
        url: getURL(url),
        headers: getHeaders(true),
        body: undefined
    } as IRequest)
}

// UPDATE
export const updateSubtaskAPI = async (subtaskId: number, body: IArgsRequest['body']) => {
    const url = `${_getSubtaskURL(subtaskId)}/update/`
    return await request({
        method: 'PUT',
        url: getURL(url),
        headers: getHeaders(true),
        body: JSON.stringify(body)
    } as IRequest)
}


// DELETE
export const deleteSubtaskAPI = async (subtaskId: number) => {
    const url = `${TASK_API}/subtask/${subtaskId}/delete/`
    return await request({
        method: 'DELETE',
        url: getURL(url),
        headers: getHeaders(true),
        body: undefined
    } as IRequest)
}