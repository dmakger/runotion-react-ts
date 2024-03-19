import React, {useState} from 'react';
import {IModal} from "core/modal/core/modal/modal";
import {cls} from "core/service/cls";
import cl from "core/modal/CreateOrAddTask/components/default/_DefaultCreateOrAddTaskModal.module.scss";
import Modal from "core/modal/core/ui/Modal";
import {EStatusCreateOrAddTaskModal} from "core/modal/CreateOrAddTask/data/data";
import DefaultCreateOrAddTaskModal from "core/modal/CreateOrAddTask/components/default/DefaultCreateOrAddTaskModal";
import AddExistsTaskCreateOrAddTaskModal
    from "core/modal/CreateOrAddTask/components/addExistsTask/AddExistsTaskCreateOrAddTaskModal";
import {ITask} from "core/entity/Task/model/model";

interface CreateOrAddTaskProps extends IModal {
    createNewTask: Function
    addExistsTask: Function
    className?: string
}

const CreateOrAddTaskModal = ({isVisible = false, setIsVisible, createNewTask, addExistsTask, className}: CreateOrAddTaskProps) => {
    const [status, setStatus] = useState(EStatusCreateOrAddTaskModal.DEFAULT)

    const createTask = () => {
        createNewTask()
    }

    const addTask = (task: ITask) => {
        addExistsTask(task)
    }

    const onAddExistsTask = () => {
        setStatus(EStatusCreateOrAddTaskModal.ADD_EXISTS_TASK)
    }

    const onDefault = () => {
        setStatus(EStatusCreateOrAddTaskModal.DEFAULT)
    }

    return (
        <Modal title={'Добавление задачи'} isVisible={isVisible} setIsVisible={setIsVisible}
               className={cls(cl.modal, className)}>
            {status === EStatusCreateOrAddTaskModal.DEFAULT && (
                <DefaultCreateOrAddTaskModal createTask={createTask} addTask={onAddExistsTask} />
            )}
            {status === EStatusCreateOrAddTaskModal.ADD_EXISTS_TASK && (
                <AddExistsTaskCreateOrAddTaskModal onBackClick={onDefault} addTask={addTask} />
            )}
        </Modal>
    );
};

export default CreateOrAddTaskModal;