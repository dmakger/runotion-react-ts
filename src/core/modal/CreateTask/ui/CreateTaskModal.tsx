import React, { useState } from 'react';
import {cls} from "core/service/cls";
import cl from "./_CreateTaskModal.module.scss";
import Modal from "core/modal/core/ui/ui/Modal";
import {IHintModal, IModal} from "core/modal/core/modal/modal";
import {createTaskAPI} from "core/entity/Task/api/TaskApi";
import SimpleListProject from "core/entity/Project/ui/simple/list/SimpleListProject";
import { IProject } from 'core/entity/Project/model/model';
import { getErrorHintModal, getSuccessHintModal } from 'core/modal/core/ui/components/hint/service/service';
import InListModal from "core/modal/core/ui/components/list/InListModal";

interface CreateTaskModalProps extends IModal {
    onClick?: Function
    isLoadingRequest?: boolean
    setIsLoadingRequest?: Function
    className?: string
}

const CreateTaskModal = ({onClick = () => {}, isLoadingRequest, setIsLoadingRequest = () => {}, isVisible = false, setIsVisible, className}: CreateTaskModalProps) => {
    // STATE
    const [selectProject, setSelectProject] = useState<IProject>()
    const [hintModal, setHintModal] = useState<IHintModal>()

    // CREATE TASK
    const createTask = () => {
        if (selectProject === undefined) {
            setHintModal(getErrorHintModal('Выберите проект в котором создастся задача'))
            return
        }
        
        setIsLoadingRequest(true)
        createTaskAPI({'project_id': selectProject.id})
            .then(r => {
                console.log(r)
                onClick(r)
                setHintModal(getSuccessHintModal('Задача успешно создана!'))
            })
            .catch(e => {
                setHintModal(getErrorHintModal(e))
            })
            .finally(() => (
                setIsLoadingRequest(false)
            ))
    }

    // ВЫБОР ПРОЕКТА
    const handleOnClickProject = (project: IProject) => {
        setSelectProject(project)
    }

    // НАЖАТИЕ НА КНОПКУ "Назад"
    const handleOnClickBack = () => {
        setIsVisible(false)
    }

    return (
        <Modal title={'Создание задачи'} hint={hintModal}
               isVisible={isVisible} setIsVisible={setIsVisible} 
               className={cls(cl.block, className)}
        >
            <InListModal titleBack={"Назад"} onClickBack={handleOnClickBack}
                         titleSuccess={"Создать"} onClickSuccess={createTask}
                         isLoadingSuccess={isLoadingRequest} titleLoadingSuccess={"Создание..."}
                         description={"Выберите проект в который добавится задача"}>
                <SimpleListProject onClick={handleOnClickProject} className={cl.projectList} />
            </InListModal>
        </Modal>
    );
};

export default CreateTaskModal;