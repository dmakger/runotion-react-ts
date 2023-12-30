import React from 'react';
import {cls} from "core/service/cls";
import cl from './_RowSidebarTask.module.scss';
import ItemSidebarTask from "core/modal/TaskDetail/components/sidebar/components/item/ItemSidebarTask";

interface RowSidebarTaskProps {
    title: string
    text?: string
    children?: string
    className?: string
}

const RowSidebarTask = ({title, text, children, className}: RowSidebarTaskProps) => {
    return (
        <ItemSidebarTask title={title}
                         text={text}
                         children={children}
                         className={cls(cl.block, className)} />
    );
};

export default RowSidebarTask;