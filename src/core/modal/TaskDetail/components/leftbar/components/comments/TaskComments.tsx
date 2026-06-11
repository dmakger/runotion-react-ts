import React, {ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState} from 'react';
import {format, isSameDay, isSameYear, isToday, parseISO} from 'date-fns';
import {ru} from 'date-fns/locale/ru';
import {createTaskCommentAPI, getTaskCommentsAPI} from 'core/entity/Task/api/TaskApi';
import {ITaskComment, ITaskFeedItem, ITaskHistory} from 'core/entity/Task/model/model';
import {getWebSocketURL} from 'core/api/mainAPI';
import {useAppSelector} from 'core/storage/hooks';
import {cls} from 'core/service/cls';
import {downloadAttachment, getAttachmentDisplayName} from '../attachments/TaskAttachments';
import cl from './_TaskComments.module.scss';

interface TaskCommentsProps {
    taskId: number
}

const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Сегодня'
    if (isSameYear(date, new Date())) return format(date, 'd MMMM', {locale: ru})
    return format(date, 'd MMMM yyyy', {locale: ru})
}

const isHistoryItem = (item: ITaskFeedItem): item is ITaskHistory => item.item_type === 'history'

const groupFeedItems = (items: ITaskFeedItem[]) => {
    return items.reduce<{label: string, items: ITaskFeedItem[]}[]>((acc, item) => {
        const date = parseISO(item.created_at)
        const lastGroup = acc[acc.length - 1]

        if (lastGroup && isSameDay(parseISO(lastGroup.items[0].created_at), date)) {
            lastGroup.items.push(item)
            return acc
        }

        acc.push({label: getDateLabel(date), items: [item]})
        return acc
    }, [])
}

const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} Б`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} КБ`
    return `${(size / 1024 / 1024).toFixed(1)} МБ`
}

const getItemKey = (item: ITaskFeedItem) => `${item.item_type || 'comment'}-${item.id}`

const TaskComments = ({taskId}: TaskCommentsProps) => {
    const currentUser = useAppSelector(state => state.user)
    const [items, setItems] = useState<ITaskFeedItem[]>([])
    const [text, setText] = useState('')
    const [files, setFiles] = useState<File[]>([])
    const [isSending, setIsSending] = useState(false)
    const socketRef = useRef<WebSocket | null>(null)
    const bottomRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const groups = useMemo(() => groupFeedItems(items), [items])

    useEffect(() => {
        getTaskCommentsAPI(taskId).then(setItems)
    }, [taskId])

    useEffect(() => {
        const socket = new WebSocket(getWebSocketURL(`/ws/tasks/${taskId}/comments/`))
        socketRef.current = socket

        socket.onmessage = (event) => {
            const payload = JSON.parse(event.data)
            if (payload.type === 'comment.created' && payload.comment) {
                addFeedItem(payload.comment)
            }
            if (payload.type === 'history.created' && payload.history) {
                addFeedItem(payload.history)
            }
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
    }, [items.length])

    const selectFiles = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || [])
        event.target.value = ''
        if (selectedFiles.length === 0) return
        setFiles(prev => [...prev, ...selectedFiles])
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, fileIndex) => fileIndex !== index))
    }

    const addFeedItem = (item: ITaskFeedItem) => {
        setItems(prev => prev.some(prevItem => getItemKey(prevItem) === getItemKey(item)) ? prev : [...prev, item])
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
                    addFeedItem(comment)
                    setText('')
                    setFiles([])
                })
                .finally(() => setIsSending(false))
            return
        }

        const optimisticComment: ITaskComment = {
            item_type: 'comment',
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

        setItems(prev => [...prev, optimisticComment])

        createTaskCommentAPI(taskId, nextText)
            .then((comment: ITaskComment) => {
                setItems(prev => prev.map(item => getItemKey(item) === getItemKey(optimisticComment) ? comment : item))
            })
            .catch(() => {
                setItems(prev => prev.filter(item => getItemKey(item) !== getItemKey(optimisticComment)))
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
                        {group.items.map(item => {
                            if (isHistoryItem(item)) {
                                return (
                                    <div className={cl.historyRow} key={getItemKey(item)}>
                                        <div className={cl.historyCard}>
                                            <span className={cl.historyTitle}>{item.title}</span>
                                            {item.text && <span className={cl.historyText}>{item.text}</span>}
                                            <span className={cl.historyMeta}>
                                                {item.user?.name || item.user?.username || 'Система'} · {format(parseISO(item.created_at), 'HH:mm')}
                                            </span>
                                        </div>
                                    </div>
                                )
                            }

                            const isMine = item.user.id === currentUser.id
                            const attachments = item.attachments || []
                            return (
                                <div className={cls(cl.messageRow, isMine ? cl.mine : '')} key={getItemKey(item)}>
                                    <div className={cl.bubble}>
                                        {!isMine && <span className={cl.author}>{item.user.name || item.user.username}</span>}
                                        {item.text && <span className={cl.text}>{item.text}</span>}
                                        {attachments.length > 0 && (
                                            <div className={cl.attachments}>
                                                {attachments.map(attachment => (
                                                    <button className={cl.attachment}
                                                            type="button"
                                                            onClick={() => downloadAttachment(attachment)}
                                                            key={attachment.id}>
                                                        <span className={cl.attachmentName}>{getAttachmentDisplayName(attachment)}</span>
                                                        <span className={cl.attachmentSize}>{formatFileSize(attachment.size)}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <span className={cl.time}>{format(parseISO(item.created_at), 'HH:mm')}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
                {items.length === 0 && <div className={cl.empty}>Комментариев пока нет</div>}
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
