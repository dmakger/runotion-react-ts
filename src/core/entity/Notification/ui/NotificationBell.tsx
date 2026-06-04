import React, {useEffect, useMemo, useRef, useState} from 'react';
import {format, parseISO} from 'date-fns';
import {getNotificationsAPI, readNotificationsAPI} from 'core/entity/Task/api/TaskApi';
import {INotification} from 'core/entity/Task/model/model';
import {getWebSocketURL} from 'core/api/mainAPI';
import cl from './_NotificationBell.module.scss';

const NotificationBell = () => {
    const [items, setItems] = useState<INotification[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const socketRef = useRef<WebSocket | null>(null)
    const unreadCount = useMemo(() => items.filter(item => !item.is_read).length, [items])

    useEffect(() => {
        getNotificationsAPI().then(setItems)
    }, [])

    useEffect(() => {
        const socket = new WebSocket(getWebSocketURL('/ws/notifications/'))
        socketRef.current = socket

        socket.onmessage = (event) => {
            const payload = JSON.parse(event.data)
            if (payload.type !== 'notification.created' || !payload.notification) return
            setItems(prev => [payload.notification, ...prev.filter(item => item.id !== payload.notification.id)].slice(0, 50))
        }

        socket.onclose = () => {
            if (socketRef.current === socket) socketRef.current = null
        }

        return () => {
            socket.close()
            if (socketRef.current === socket) socketRef.current = null
        }
    }, [])

    const markAllAsRead = () => {
        if (unreadCount === 0) return
        readNotificationsAPI().then(() => {
            setItems(prev => prev.map(item => ({...item, is_read: true})))
        })
    }

    return (
        <div className={cl.wrapper}>
            <button className={cl.button} type="button" onClick={() => setIsOpen(prev => !prev)} title="Уведомления">
                <span className={cl.icon}/>
                {unreadCount > 0 && <span className={cl.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>}
            </button>
            {isOpen && (
                <div className={cl.dropdown}>
                    <div className={cl.header}>
                        <span>Уведомления</span>
                        <button type="button" onClick={markAllAsRead} disabled={unreadCount === 0}>Прочитать</button>
                    </div>
                    <div className={cl.list}>
                        {items.length === 0 && <div className={cl.empty}>Уведомлений пока нет</div>}
                        {items.map(item => (
                            <div className={item.is_read ? cl.item : `${cl.item} ${cl.unread}`} key={item.id}>
                                <div className={cl.title}>{item.title}</div>
                                {item.text && <div className={cl.text}>{item.text}</div>}
                                <div className={cl.meta}>
                                    {item.actor && <span>{item.actor.name || item.actor.username}</span>}
                                    <span>{format(parseISO(item.created_at), 'dd.MM.yyyy HH:mm')}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationBell;
