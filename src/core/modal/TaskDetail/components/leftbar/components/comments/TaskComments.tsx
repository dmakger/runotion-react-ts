import React, {FormEvent, useEffect, useMemo, useRef, useState} from 'react';
import {format, isSameDay, isSameYear, isToday, parseISO} from 'date-fns';
import {ru} from 'date-fns/locale/ru';
import {createTaskCommentAPI, getTaskCommentsAPI} from 'core/entity/Task/api/TaskApi';
import {ITaskComment} from 'core/entity/Task/model/model';
import {useAppSelector} from 'core/storage/hooks';
import {cls} from 'core/service/cls';
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

const TaskComments = ({taskId}: TaskCommentsProps) => {
    const currentUser = useAppSelector(state => state.user)
    const [comments, setComments] = useState<ITaskComment[]>([])
    const [text, setText] = useState('')
    const [isSending, setIsSending] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const groups = useMemo(() => groupComments(comments), [comments])

    useEffect(() => {
        getTaskCommentsAPI(taskId).then(setComments)
    }, [taskId])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({block: 'end'})
    }, [comments.length])

    const sendComment = (event?: FormEvent) => {
        event?.preventDefault()
        const nextText = text.trim()
        if (!nextText || isSending) return

        const optimisticComment: ITaskComment = {
            id: -Date.now(),
            user: currentUser,
            text: nextText,
            created_at: new Date().toISOString(),
        }

        setText('')
        setIsSending(true)
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
            <div className={cl.header}>Переписка</div>
            <div className={cl.messages}>
                {groups.map(group => (
                    <div className={cl.group} key={group.label}>
                        <div className={cl.date}>{group.label}</div>
                        {group.comments.map(comment => {
                            const isMine = comment.user.id === currentUser.id
                            return (
                                <div className={cls(cl.messageRow, isMine ? cl.mine : '')} key={comment.id}>
                                    <div className={cl.bubble}>
                                        {!isMine && <span className={cl.author}>{comment.user.name || comment.user.username}</span>}
                                        <span className={cl.text}>{comment.text}</span>
                                        <span className={cl.time}>{format(parseISO(comment.created_at), 'HH:mm')}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
                {comments.length === 0 && <div className={cl.empty}>Сообщений пока нет</div>}
                <div ref={bottomRef}/>
            </div>
            <form className={cl.form} onSubmit={sendComment}>
                <textarea value={text}
                          onChange={(event) => setText(event.target.value)}
                          onKeyDown={(event) => {
                              if (event.key === 'Enter' && !event.shiftKey) sendComment(event)
                          }}
                          placeholder="Написать сообщение"
                          className={cl.input}/>
                <button className={cl.send} type="submit" disabled={!text.trim() || isSending}>
                    Отправить
                </button>
            </form>
        </section>
    );
};

export default TaskComments;
