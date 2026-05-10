import {getHeaders, getURL, request, URL_API} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";

export const PROJECT_API = URL_API + '/project'


// PROJECTS
export const getProjectsAPI = async (params?: IArgsRequest["params"]) => {
    const url = `${PROJECT_API}/all/`
    return await request({
        method: 'GET',
        url: getURL(url, params),
        headers: getHeaders(true),
    } as IRequest)
}


// PROJECT BY ID
export const getProjectByIdAPI = async (projectId: number | string) => {
    const url = `${PROJECT_API}/detail/${projectId}`
    return await request({
        method: 'GET',
        url: getURL(url),
        headers: getHeaders(true),
    } as IRequest)
}


// CREATE PROJECT
export const createProjectAPI = async (body: IArgsRequest["body"]) => {
    const url = `${PROJECT_API}/create/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


export const getProjectRolesAPI = async () => {
    const url = `${PROJECT_API}/roles/`
    return await request({
        method: 'GET',
        url: url,
        headers: getHeaders(true),
    } as IRequest)
}


export const getProjectUsersAPI = async (projectId: number | string) => {
    const url = `${PROJECT_API}/${projectId}/users/`
    return await request({
        method: 'GET',
        url: url,
        headers: getHeaders(true),
    } as IRequest)
}


export const getProjectUsersWithParamsAPI = async (projectId: number | string, params?: IArgsRequest["params"]) => {
    const url = `${PROJECT_API}/${projectId}/users/`
    return await request({
        method: 'GET',
        url: getURL(url, params),
        headers: getHeaders(true),
    } as IRequest)
}


export const addProjectUserAPI = async (projectId: number | string, body: IArgsRequest["body"]) => {
    const url = `${PROJECT_API}/${projectId}/users/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}
