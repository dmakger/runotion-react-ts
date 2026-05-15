import React from 'react';
import cl from './_CompleteButtonSidebarTask.module.scss'
import {cls} from "core/service/cls";
import {updateTaskAPI} from "core/entity/Task/api/TaskApi";
import {ITask} from "core/entity/Task/model/model";

interface CompleteButtonSidebarTaskProps {
    task: ITask
    isCompleted?: boolean
    onTaskChange?: (task: ITask) => void
    className?: string
}

const CompleteButtonSidebarTask = ({task, isCompleted=false, onTaskChange, className}: CompleteButtonSidebarTaskProps) => {

    const handleOnClick = () => {
        let completed_at: string | null = null
        if (!isCompleted) {
            completed_at = new Date().toISOString()
        }
        updateTaskAPI({id: task.id, completed_at: completed_at}).then((response: ITask) => {
            const updatedTask = {...task, ...response}
            onTaskChange?.(updatedTask)
            window.dispatchEvent(new CustomEvent('runotion:task-updated', {detail: {task: updatedTask}}))
        })
    }

    return (
        <button type={"button"} onClick={handleOnClick} className={cls(cl.button, isCompleted ? cl.resume: cl.complete, className)}>
            {isCompleted ? "Возобновить" : "Завершить задачу"}
        </button>
    );
};

export default CompleteButtonSidebarTask;
