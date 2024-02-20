import {getHeaders, getURL, request, URL_API} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";
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
