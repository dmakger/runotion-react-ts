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
