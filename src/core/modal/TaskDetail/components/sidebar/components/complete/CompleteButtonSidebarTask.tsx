import React from 'react';
import cl from './_CompleteButtonSidebarTask.module.scss'
import {cls} from "core/service/cls";
import { format } from 'date-fns';
import {updateTaskAPI} from "core/entity/Task/api/TaskApi";

interface CompleteButtonSidebarTaskProps {
    taskId: number
    isCompleted?: boolean
    className?: string
}

const CompleteButtonSidebarTask = ({taskId, isCompleted=false, className}: CompleteButtonSidebarTaskProps) => {

    const handleOnClick = () => {
        let completed_at: string | null = null
        if (!isCompleted) {
            completed_at = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSSSSxxx");
        }
        updateTaskAPI({id: taskId, completed_at: completed_at}).then()
    }

    return (
        <button type={"button"} onClick={handleOnClick} className={cls(cl.button, isCompleted ? cl.resume: cl.complete, className)}>
            {isCompleted ? "Возобновить" : "Завершить задачу"}
        </button>
    );
};

export default CompleteButtonSidebarTask;