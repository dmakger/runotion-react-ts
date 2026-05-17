import React from 'react';
import cl from './_TextBlockSidebarTask.module.scss'
import {cls} from "core/service/cls";
import {formattedData} from "core/service/date";
import {ITask} from "core/entity/Task/model/model";
import {updateTaskAPI} from "core/entity/Task/api/TaskApi";

interface TextBlockSidebarTaskProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
    className?: string
}

const toDateTimeLocal = (value?: string | null) => {
    if (!value) return ''
    const date = new Date(value)
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return offsetDate.toISOString().slice(0, 16)
}

const TextBlockSidebarTask = ({task, onTaskChange, className}: TextBlockSidebarTaskProps) => {
    const updateDeadline = (value: string) => {
        const deadline = value ? new Date(value).toISOString() : null
        updateTaskAPI({id: task.id, deadline}).then((response: ITask) => {
            const updatedTask = {...task, ...response}
            onTaskChange?.(updatedTask)
            window.dispatchEvent(new CustomEvent('runotion:task-updated', {detail: {task: updatedTask}}))
        })
    }

    return (
        <div className={cls(cl.block, className)}>
            <label className={cl.deadline}>
                <span className={cl.title}>Крайний срок:</span>
                <input type="datetime-local"
                       value={toDateTimeLocal(task.deadline)}
                       onChange={(event) => updateDeadline(event.target.value)}/>
                {task.deadline && <button type="button" onClick={() => updateDeadline('')}>Сбросить</button>}
            </label>
            <div className={cl.item}>
                <span className={cl.title}>Создана:</span>
                <span className={cl.text}>{formattedData(task.created_at)}</span>
            </div>
        </div>
    );
};

export default TextBlockSidebarTask;
