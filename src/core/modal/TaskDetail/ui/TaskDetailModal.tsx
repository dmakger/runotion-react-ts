import React, {useEffect, useState} from 'react';
import {getDetailTask} from "core/entity/Task/api/TaskApi";
import {ITask} from "core/entity/Task/model/model";
import cl from 'core/modal/TaskDetail/ui/_TaskDetailModal.module.scss';
import {cls} from "core/service/cls";
import Modal from "core/modal/core/ui/ui/Modal";
import {IModal} from "core/modal/core/modal/modal";
import SidebarTask from "core/modal/TaskDetail/components/sidebar/ui/SidebarTask";
import LeftBarTask from '../components/leftbar/LeftBarTask';
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";

interface TaskDetailModalProps extends IModal {
    id?: number
    className?: string
}

const TaskDetailModal = ({isVisible = false, setIsVisible, id, className}: TaskDetailModalProps) => {
    console.log('TaskDetailModal', id);
    
    const [task, setTask] = useState<ITask | undefined>(undefined);
    const [isLoadingTask, setIsLoadingTask] = useState(false);

    useEffect(() => {
        setIsLoadingTask(true)
        if (id !== undefined) {
            getDetailTask({id}).then(it => {
                setTask(() => {
                    setIsLoadingTask(false)
                    return it
                })
            })
        }
    }, [id]);

    if (!id || !task)
        return null;

    return (
        <Modal isVisible={isVisible} setIsVisible={setIsVisible} className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={isLoadingTask} className={cl.loadingWrapper}>
                <>
                    <LeftBarTask id={id} task={task}/>
                    <SidebarTask task={task}/>
                </>
            </LoadingWrapper>
        </Modal>
    );
};

export default TaskDetailModal;