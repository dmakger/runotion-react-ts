import {getHeaders, getURL, request, URL_API} from "core/api/mainAPI";
import {IArgsRequest, IRequest} from "core/api/model/model";

export const TASK_API = URL_API + '/task'

const getAuthFormHeaders = () => ({
    Accept: '*/*',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
})

// TASKS
export const getTasksAPI = async (params?: IArgsRequest["params"], body?: IArgsRequest["body"]) => {
    const url = `${TASK_API}/all/`
    return await request({
        method: 'POST',
        url: getURL(url, params),
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

// DETAIL TASK
export const getDetailTask = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/${body!.id}/`
    return await request({
        method: 'GET',
        url: url,
        headers: getHeaders(true),
    } as IRequest)
}


// CREATE TASK
export const createTaskAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/create/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


// UPDATE TASK
export const updateTaskAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/${body!.id}/update/`
    return await request({
        method: 'PUT',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

export const getTaskCategoriesAPI = async (projectId: number | string, params?: IArgsRequest["params"]) => {
    const url = `${TASK_API}/project/${projectId}/category/`
    return await request({
        method: 'GET',
        url: getURL(url, params),
        headers: getHeaders(true),
    } as IRequest)
}

export const addTaskUserAPI = async (
    taskId: number | string,
    body: {user_id: number | string, level: 'responsible' | 'collaborator' | 'observer'},
) => {
    const url = `${TASK_API}/${taskId}/users/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

export const deleteTaskUserAPI = async (taskId: number | string, userId: number | string) => {
    const url = `${TASK_API}/${taskId}/users/${userId}/`
    return await request({
        method: 'DELETE',
        url: url,
        headers: getHeaders(true),
    } as IRequest)
}

export const getTaskCommentsAPI = async (taskId: number | string) => {
    const url = `${TASK_API}/${taskId}/comments/`
    return await request({
        method: 'GET',
        url: url,
        headers: getHeaders(true),
    } as IRequest)
}

export const createTaskCommentAPI = async (taskId: number | string, text: string, files: File[] = []) => {
    const url = `${TASK_API}/${taskId}/comments/`
    if (files.length > 0) {
        const formData = new FormData()
        formData.append('text', text)
        files.forEach(file => formData.append('attachments', file))

        return await request({
            method: 'POST',
            url: url,
            headers: getAuthFormHeaders(),
            body: formData,
        } as IRequest)
    }

    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify({text}),
    } as IRequest)
}

export const getNotificationsAPI = async () => {
    const url = `${TASK_API}/notifications/`
    return await request({
        method: 'GET',
        url,
        headers: getHeaders(true),
    } as IRequest)
}

export const getTaskAttachmentsAPI = async (taskId: number | string) => {
    const url = `${TASK_API}/${taskId}/attachments/`
    return await request({
        method: 'GET',
        url,
        headers: getHeaders(true),
    } as IRequest)
}

export const createTaskAttachmentsAPI = async (taskId: number | string, files: File[]) => {
    const url = `${TASK_API}/${taskId}/attachments/`
    const formData = new FormData()
    files.forEach(file => formData.append('attachments', file))

    return await request({
        method: 'POST',
        url,
        headers: getAuthFormHeaders(),
        body: formData,
    } as IRequest)
}

export const deleteTaskAttachmentAPI = async (attachmentId: number | string) => {
    const url = `${TASK_API}/attachment/${attachmentId}/delete/`
    return await request({
        method: 'DELETE',
        url,
        headers: getHeaders(true),
    } as IRequest)
}

export const readNotificationsAPI = async (ids?: number[]) => {
    const url = `${TASK_API}/notifications/`
    return await request({
        method: 'PATCH',
        url,
        headers: getHeaders(true),
        body: JSON.stringify(ids ? {ids} : {all: true}),
    } as IRequest)
}

export const createTaskCategoryAPI = async (projectId: number | string, body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/project/${projectId}/category/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

export const updateTaskCategoryAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/category/${body!.id}/update/`
    return await request({
        method: 'PUT',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}


// ADD TASK IN SECTION
export const addTaskInSectionAPI = async (body: IArgsRequest["body"]) => {
    const url = `${TASK_API}/${body!.taskId}/add/section/${body!.sectionId}/`
    return await request({
        method: 'POST',
        url: url,
        headers: getHeaders(true),
        body: JSON.stringify(body),
    } as IRequest)
}

