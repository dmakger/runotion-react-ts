import {getHeaders, getParams, getURL, request} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";
import { TASK_API } from "core/entity/Task/api/TaskApi";

const _getChecklistURL = (taskId: number) => {
    return `${TASK_API}/${taskId}/checklist`
}

// TASKS
export const getChecklist = async (taskId: number, params?: IArgsRequest["params"]) => {
    const url = `${_getChecklistURL(taskId)}/${getParams(params)}`
    return await request({
        method: 'GET',
        url: getURL(url, params),
        headers: getHeaders(true),
    } as IRequest)
}