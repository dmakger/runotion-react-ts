import {IArgsRequest, IRequest} from "core/api/model/model";
import {getHeaders, request, URL_API} from "core/api/mainAPI";


export const CHART_API = URL_API + '/chart'



// PROJECTS
export const tasksWithDeviationAPI = async (body: IArgsRequest["body"]) => {
    const url = `${CHART_API}/number_of_rejected_tasks/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


export const taskByQuarterAPI = async (body: IArgsRequest["body"]) => {
    const url = `${CHART_API}/task_by_quarter/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


export const taskToPerformersAPI = async (body: IArgsRequest["body"]) => {
    const url = `${CHART_API}/task_to_performers/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}
