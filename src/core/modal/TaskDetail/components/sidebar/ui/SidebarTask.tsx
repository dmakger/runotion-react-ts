import React from 'react';
import {cls} from "core/service/cls";
import cl from './_SidebarTask.module.scss'
import RowSidebarTask from "core/modal/TaskDetail/components/sidebar/components/row/RowSidebarTask";
import {ITask} from "core/entity/Task/model/model";

interface SidebarTaskProps {
    task?: ITask
    className?: string
}

const SidebarTask = ({task, className}: SidebarTaskProps) => {
    if (task === undefined)
        return null

    return (
        <div className={cls(cl.block, className)}>
            <RowSidebarTask title={'Крайний срок'} />
        </div>
    );
};

export default SidebarTask;