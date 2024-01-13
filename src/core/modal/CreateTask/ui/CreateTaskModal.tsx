import React from 'react';
import {cls} from "core/service/cls";
import cl from "./_CreateTaskModal.module.scss";
import Modal from "core/modal/core/ui/Modal";
import {IModal} from "core/modal/core/modal/modal";
import {createTaskAPI} from "core/entity/Task/api/TaskApi";
import SimpleListProject from "core/entity/Project/ui/simple/list/SimpleListProject";

interface CreateTaskModalProps extends IModal {
    onClick?: Function
    setIsLoadingRequest?: Function
    className?: string
}

const CreateTaskModal = ({onClick = () => {}, setIsLoadingRequest = () => {}, isVisible = false, setIsVisible, className}: CreateTaskModalProps) => {

    const createTask = () => {
        const projectId = 1
        if (projectId === undefined) return

        setIsLoadingRequest(true)
        createTaskAPI({'project_id': projectId})
            .then(r => {
                console.log(r)
                onClick(r)
            })
            .finally(() => (
                setIsLoadingRequest(true)
            ))
    }

    return (
        <Modal title={'Создание задачи'} isVisible={isVisible} setIsVisible={setIsVisible} className={cls(cl.block, className)}>
            <div>
                <SimpleListProject className={cl.content} />
                <div className={cl.buttons}>
                    <button>
                        Добавить
                    </button>
                </div>
            </div>
        </Modal>

        );
};

export default CreateTaskModal;