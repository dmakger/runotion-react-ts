import React, {ReactNode} from 'react';
import cl from './_ItemSidebarTask.module.scss'

interface ItemSidebarTaskProps {
    title: string
    text?: string
    children?: ReactNode
    className?: string
}

const ItemSidebarTask = ({title, text, children, className}: ItemSidebarTaskProps) => {
    return (
        <div className={className}>
            <span className={cl.title}>{title}:</span>
            {text &&
                <span className={cl.text}>{text}</span>
            }
            {children}
        </div>
    );
};

export default ItemSidebarTask;