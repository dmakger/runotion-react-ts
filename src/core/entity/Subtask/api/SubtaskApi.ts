import {getHeaders, getParams, getURL, request} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";
import { TASK_API } from "core/entity/Task/api/TaskApi";

const _getSubtaskURL = (subtaskId?: number, checklistId?: number) => {
    if (subtaskId !== undefined)
        return  `${TASK_API}/subtask/${subtaskId}`
    if (checklistId !== undefined)
        return `${TASK_API}/checklist/${checklistId}/subtask`
}

// UPDATE
export const updateSubtask = async (subtaskId: number, body: IArgsRequest['body']) => {
    const url = `${_getSubtaskURL(subtaskId)}/update/`
    return await request({
        method: 'PUT',
        url: getURL(url),
        headers: getHeaders(true),
        body: JSON.stringify(body)
    } as IRequest)
}