import React, {useEffect, useState} from 'react';
import {getDetailTask} from "core/entity/Task/api/TaskApi";
import {ITask} from "core/entity/Task/model/model";

interface TaskDetailModalProps {
    id?: number
    className?: string
}

const TaskDetailModal = ({ id, className }: TaskDetailModalProps) => {
    const [task, setTask] = useState<ITask | undefined>(undefined);

    useEffect(() => {
        if (id !== undefined) {
            getDetailTask({ id }).then(it => {
                setTask(it)
            })
        }
    }, [id]);

    console.log(task);

    if (!id || !task)
        return null;

    return (
        <div>

        </div>
    );
};

export default TaskDetailModal;