import {IParams, IRequest} from "core/api/model/model";

export const LOCAL_URL = 'http://127.0.0.1:8000';
export const GLOBAL_URL = 'https://api.ru-notion.ru';
export const IS_PROD = false;
// export const CURRENT_URL = GLOBAL_URL;
export const CURRENT_URL = LOCAL_URL;
export const URL_API = `${CURRENT_URL}/api`;

export const HEADERS: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
}

let refreshPromise: Promise<string> | null = null

const isAuthUrl = (url: string) => {
    return url.includes('/token/') || url.includes('/token/refresh/')
}

const redirectToLogin = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    if (!window.location.pathname.includes('/auth/login')) {
        window.location.href = '/auth/login/'
    }
}

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) return Promise.reject()

    if (!refreshPromise) {
        refreshPromise = fetch(`${URL_API}/token/refresh/`, {
            method: 'POST',
            credentials: 'include',
            headers: getHeaders(),
            body: JSON.stringify({refresh: refreshToken}),
        }).then(async response => {
            if (!response.ok) return Promise.reject(response)

            const data = await response.json()
            localStorage.setItem('accessToken', data.access)
            if (data.refresh !== undefined) localStorage.setItem('refreshToken', data.refresh)
            return data.access as string
        }).finally(() => {
            refreshPromise = null
        })
    }

    return refreshPromise
}

const updateAuthHeader = (headers?: Record<string, string>) => {
    if (!headers?.Authorization) return headers

    return {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }
}

// Получение заголовков для запросов
export function getHeaders(forAuth: boolean = false) {
    if (forAuth)
        return {
            ...HEADERS,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
    return HEADERS
}


export const getParams = (params?: IParams) => {
    if (params === undefined) return ''
    let paramsStr: string[] = []
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            paramsStr.push(`${key}=${encodeURIComponent(value)}`)
        }
    })

    if (paramsStr.length > 0)
        return `?${paramsStr.join('&')}`
    return ''
}

export function getURL(url: string, params?: IParams) {
    if (!params)
        return url
    return url + getParams(params)
}

export async function request({method, url, body, headers}: IRequest) {
    const data: Record<string, any> = {
        method: method,
        credentials: 'include',
        body: body,
    }
    if (headers !== undefined) data.headers = headers
    else if (!(body instanceof FormData)) data.headers = getHeaders()

    const res = await fetch(url, data)
    if (res.ok) {
        if (res.status === 204)
            return null
        return await res.json();
    }

    if (res.status === 401 && !isAuthUrl(url)) {
        try {
            await refreshAccessToken()

            const retryRes = await fetch(url, {
                ...data,
                headers: updateAuthHeader(data.headers),
            })

            if (retryRes.ok) {
                if (retryRes.status === 204)
                    return null
                return await retryRes.json();
            }

            if (retryRes.status === 401) redirectToLogin()
            return Promise.reject(retryRes)
        } catch (error) {
            redirectToLogin()
            return Promise.reject(error)
        }
    }

    if (res.status === 401) redirectToLogin()
    return Promise.reject(res);
}
