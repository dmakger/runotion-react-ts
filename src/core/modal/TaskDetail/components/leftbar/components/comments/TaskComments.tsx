import React, {ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState} from 'react';
import {format, isSameDay, isSameYear, isToday, parseISO} from 'date-fns';
import {ru} from 'date-fns/locale/ru';
import {createTaskCommentAPI, getTaskCommentsAPI} from 'core/entity/Task/api/TaskApi';
import {ITaskComment} from 'core/entity/Task/model/model';
import {getWebSocketURL} from 'core/api/mainAPI';
import {useAppSelector} from 'core/storage/hooks';
import {cls} from 'core/service/cls';
import {getAttachmentUrl} from '../attachments/TaskAttachments';
import cl from './_TaskComments.module.scss';

interface TaskCommentsProps {
    taskId: number
}

const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Сегодня'
    if (isSameYear(date, new Date())) return format(date, 'd MMMM', {locale: ru})
    return format(date, 'd MMMM yyyy', {locale: ru})
}

const groupComments = (comments: ITaskComment[]) => {
    return comments.reduce<{label: string, comments: ITaskComment[]}[]>((acc, comment) => {
        const date = parseISO(comment.created_at)
        const lastGroup = acc[acc.length - 1]

        if (lastGroup && isSameDay(parseISO(lastGroup.comments[0].created_at), date)) {
            lastGroup.comments.push(comment)
            return acc
        }

        acc.push({label: getDateLabel(date), comments: [comment]})
        return acc
    }, [])
}

const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} Б`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} КБ`
    return `${(size / 1024 / 1024).toFixed(1)} МБ`
}

const TaskComments = ({taskId}: TaskCommentsProps) => {
    const currentUser = useAppSelector(state => state.user)
    const [comments, setComments] = useState<ITaskComment[]>([])
    const [text, setText] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [isSending, setIsSending] = useState(false)
    const socketRef = useRef<WebSocket | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const groups = useMemo(() => groupComments(comments), [comments])

    useEffect(() => {
        getTaskCommentsAPI(taskId).then(setComments)
    }, [taskId])

    useEffect(() => {
        const socket = new WebSocket(getWebSocketURL(`/ws/tasks/${taskId}/comments/`))
        socketRef.current = socket

        socket.onmessage = (event) => {
            const payload = JSON.parse(event.data)
            if (payload.type !== 'comment.created' || !payload.comment) return
            setComments(prev => prev.some(item => item.id === payload.comment.id) ? prev : [...prev, payload.comment])
        }

        socket.onclose = () => {
            if (socketRef.current === socket) socketRef.current = null
        }

        return () => {
            socket.close()
            if (socketRef.current === socket) socketRef.current = null
        }
    }, [taskId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({block: 'end'})
    }, [comments.length])

    const selectFiles = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        event.target.value = ''
        if (selectedFiles.length === 0) return
        setFiles(prev => [...prev, ...selectedFiles])
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, fileIndex) => fileIndex !== index))
    }

    const addComment = (comment: ITaskComment) => {
        setComments(prev => prev.some(item => item.id === comment.id) ? prev : [...prev, comment])
    }

    const sendComment = (event?: FormEvent) => {
        event?.preventDefault()
        const nextText = text.trim()
        const nextFiles = files
        if ((!nextText && nextFiles.length === 0) || isSending) return

        if (nextFiles.length > 0) {
            setIsSending(true)
            createTaskCommentAPI(taskId, nextText, nextFiles)
                .then((comment: ITaskComment) => {
                    addComment(comment)
                    setText('')
                    setFiles([])
                })
                .finally(() => setIsSending(false))
            return
        }

        const optimisticComment: ITaskComment = {
            id: -Date.now(),
            user: currentUser,
            text: nextText,
            attachments: [],
            created_at: new Date().toISOString(),
        }

        setText('')
        setIsSending(true)
        const socket = socketRef.current
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({type: 'comment.create', text: nextText}))
            setIsSending(false)
            return
        }

        setComments(prev => [...prev, optimisticComment])

        createTaskCommentAPI(taskId, nextText)
            .then((comment: ITaskComment) => {
                setComments(prev => prev.map(item => item.id === optimisticComment.id ? comment : item))
            })
            .catch(() => {
                setComments(prev => prev.filter(item => item.id !== optimisticComment.id))
                setText(nextText)
            })
            .finally(() => setIsSending(false))
    }

    return (
        <section className={cl.block}>
            <div className={cl.header}>Обсуждение</div>
            <div className={cl.messages}>
                {groups.map(group => (
                    <div className={cl.group} key={group.label}>
                        <div className={cl.date}>{group.label}</div>
                        {group.comments.map(comment => {
                            const isMine = comment.user.id === currentUser.id
                            const attachments = comment.attachments || []
                            return (
                                <div className={cls(cl.messageRow, isMine ? cl.mine : '')} key={comment.id}>
                                    <div className={cl.bubble}>
                                        {!isMine && <span className={cl.author}>{comment.user.name || comment.user.username}</span>}
                                        {comment.text && <span className={cl.text}>{comment.text}</span>}
                                        {attachments.length > 0 && (
                                            <div className={cl.attachments}>
                                                {attachments.map(attachment => (
                                                    <a className={cl.attachment}
                                                       href={getAttachmentUrl(attachment)}
                                                       target="_blank"
                                                       rel="noreferrer"
                                                       key={attachment.id}>
                                                        <span className={cl.attachmentName}>{attachment.name}</span>
                                                        <span className={cl.attachmentSize}>{formatFileSize(attachment.size)}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                        <span className={cl.time}>{format(parseISO(comment.created_at), 'HH:mm')}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
                {comments.length === 0 && <div className={cl.empty}>Комментариев пока нет</div>}
                <div ref={bottomRef}/>
            </div>
            <form className={cl.form} onSubmit={sendComment}>
                <div className={cl.composer}>
                    <textarea value={text}
                              onChange={(event) => setText(event.target.value)}
                              onKeyDown={(event) => {
                                  if (event.key === 'Enter' && !event.shiftKey) sendComment(event)
                              }}
                              placeholder="Написать комментарий"
                              className={cl.input}/>
                    {files.length > 0 && (
                        <div className={cl.selectedFiles}>
                            {files.map((file, index) => (
                                <button className={cl.selectedFile}
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        key={`${file.name}-${file.size}-${index}`}>
                                    {file.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button className={cl.attach}
                        type="button"
                        onClick={() => fileInputRef.current?.click()}>
                    Файл
                </button>
                <input ref={fileInputRef}
                       className={cl.fileInput}
                       type="file"
                       multiple
                       onChange={selectFiles}/>
                <button className={cl.send} type="submit" disabled={(!text.trim() && files.length === 0) || isSending}>
                    Отправить
                </button>
            </form>
        </section>
    );
};

export default TaskComments;
