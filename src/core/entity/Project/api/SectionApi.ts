import {getHeaders, getURL, request, URL_API} from "core/api/mainAPI";
import {IRequest} from "core/api/model/model";
import {PROJECT_API} from "core/entity/Project/api/ProjectApi";


// CORE
export const getSectionURL = (projectId: number | string) => {
    return `${PROJECT_API}/${projectId}/section`
}


// ====={ API }=====
// PROJECTS
export const getSectionsProjectsAPI = async (projectId: number | string) => {
    const url = `${getSectionURL(projectId)}/all/`
    return await request({
        method: 'GET',
        url: getURL(url),
        headers: getHeaders(true),
    } as IRequest)
}

export const createSectionProjectAPI = async (
    projectId: number | string,
    body: { name: string, color_value?: string },
) => {
    const url = `${getSectionURL(projectId)}/create/`
    return await request({
        method: 'POST',
        url: getURL(url),
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

export const updateSectionProjectAPI = async (
    projectId: number | string,
    sectionId: number | string,
    body: { name?: string, position?: number },
) => {
    const url = `${getSectionURL(projectId)}/${sectionId}/update/`
    return await request({
        method: 'PUT',
        url: getURL(url),
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


export const taskInOtherSectionProjectsAPI = async (
    section_project_id: number | string,
    taskId: number | string,
    position?: number,
) => {
    const url = `${URL_API}/task/section-project/${section_project_id}/task/${taskId}/update/`
    return await request({
        method: 'PUT',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify({position}),
    } as IRequest)
}
