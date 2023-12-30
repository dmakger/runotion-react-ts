import React, {useEffect, useState} from 'react';
import {getDetailTask} from "core/entity/Task/api/TaskApi";
import {ITask} from "core/entity/Task/model/model";
import cl from 'core/modal/TaskDetail/ui/_TaskDetailModal.module.scss';
import {cls} from "core/service/cls";
import Modal from "core/modal/core/ui/Modal";
import {IModal} from "core/modal/core/modal/modal";
import SidebarTask from "core/modal/TaskDetail/components/sidebar/ui/SidebarTask";

interface TaskDetailModalProps extends IModal {
    id?: number
    className?: string
}

const TaskDetailModal = ({ isVisible=false, setIsVisible, id, className }: TaskDetailModalProps) => {
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
        <Modal isVisible={isVisible} setIsVisible={setIsVisible} className={cls(cl.block, className)}>
            <h2 className={cl.title}>{task.name}</h2>
            <SidebarTask task={task} />
        </Modal>
    );
};

export default TaskDetailModal;