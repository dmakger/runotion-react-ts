import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {CURRENT_URL} from 'core/api/mainAPI';
import {
    createTaskAttachmentsAPI,
    deleteTaskAttachmentAPI,
} from 'core/entity/Task/api/TaskApi';
import {ITask, ITaskAttachment} from 'core/entity/Task/model/model';
import cl from './_TaskAttachments.module.scss';

interface TaskAttachmentsProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
}

const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} Б`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} КБ`
    return `${(size / 1024 / 1024).toFixed(1)} МБ`
}

const getAbsoluteUrl = (url: string) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${CURRENT_URL}${url.startsWith('/') ? url : `/${url}`}`
}

export const getAttachmentUrl = (attachment: Pick<ITaskAttachment, 'file' | 'file_url'>) => {
    return getAbsoluteUrl(attachment.file_url || attachment.file)
}

export const getAttachmentDownloadUrl = (
    attachment: Pick<ITaskAttachment, 'file' | 'file_url' | 'download_url'>,
) => {
    return getAbsoluteUrl(attachment.download_url || attachment.file_url || attachment.file)
}

export const getAttachmentDisplayName = (attachment: Pick<ITaskAttachment, 'name' | 'display_name'>) => {
    return attachment.display_name || attachment.name
}

export const downloadAttachment = async (attachment: ITaskAttachment) => {
    const response = await fetch(getAttachmentDownloadUrl(attachment), {
        credentials: 'include',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    })
    if (!response.ok) return Promise.reject(response)

    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = getAttachmentDisplayName(attachment)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
}

const TaskAttachments = ({task, onTaskChange = () => {}}: TaskAttachmentsProps) => {
    const [attachments, setAttachments] = useState<ITaskAttachment[]>(task.attachments || [])
    const [isUploading, setIsUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setAttachments(task.attachments || [])
    }, [task.attachments, task.id])

    const updateAttachments = (nextAttachments: ITaskAttachment[]) => {
        setAttachments(nextAttachments)
        onTaskChange({...task, attachments: nextAttachments})
    }

    const uploadAttachments = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])
        event.target.value = ''
        if (files.length === 0 || isUploading) return

        setIsUploading(true)
        createTaskAttachmentsAPI(task.id, files)
            .then((createdAttachments: ITaskAttachment[]) => {
                updateAttachments([...attachments, ...createdAttachments])
            })
            .finally(() => setIsUploading(false))
    }

    const deleteAttachment = (attachmentId: number) => {
        deleteTaskAttachmentAPI(attachmentId).then(() => {
            updateAttachments(attachments.filter(attachment => attachment.id !== attachmentId))
        })
    }

    return (
        <section className={cl.block}>
            <div className={cl.header}>
                <span>Вложения</span>
                <button className={cl.upload}
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={isUploading}>
                    {isUploading ? 'Загрузка...' : 'Прикрепить'}
                </button>
                <input ref={inputRef}
                       className={cl.fileInput}
                       type="file"
                       multiple
                       onChange={uploadAttachments}/>
            </div>
            {attachments.length > 0 ? (
                <div className={cl.list}>
                    {attachments.map(attachment => (
                        <div className={cl.item} key={attachment.id}>
                            <button className={cl.link}
                                    type="button"
                                    onClick={() => downloadAttachment(attachment)}>
                                <span className={cl.displayName}>{getAttachmentDisplayName(attachment)}</span>
                                <span className={cl.storedName}>Сохранено как: {attachment.stored_name || attachment.file}</span>
                            </button>
                            <span className={cl.size}>{formatFileSize(attachment.size)}</span>
                            <button className={cl.delete}
                                    type="button"
                                    onClick={() => deleteAttachment(attachment.id)}>
                                Удалить
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cl.empty}>Файлов пока нет</div>
            )}
        </section>
    );
};

export default TaskAttachments;
