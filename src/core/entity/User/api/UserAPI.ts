import {getHeaders, request, URL_API} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";

const USER_API = URL_API + '/user'

// AUTH
export const login = async ({body}: IArgsRequest) => {
    const url = `${URL_API}/token/`
    const bodyJSON = JSON.stringify(body)

    return await request({
        method: 'POST',
        url: url,
        body: bodyJSON,
    } as IRequest)
}

export const refreshToken = async () => {
    const url = `${URL_API}/token/refresh/`

    const bodyJSON = JSON.stringify({'refresh': localStorage.getItem('refreshToken')})
    return await request({
        method: 'POST',
        url: url,
        body: bodyJSON,
    } as IRequest)
}


export const getUserData = async () => {
    const url = `${USER_API}/get/`
    const headers = getHeaders(true)
    return await request({method: 'GET', url, headers} as IRequest)
}