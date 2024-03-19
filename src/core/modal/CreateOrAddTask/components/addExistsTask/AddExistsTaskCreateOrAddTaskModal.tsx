import React, {useState} from 'react';
import {ITask} from "core/entity/Task/model/model";
import InListModal from "core/modal/core/ui/components/list/InListModal";
import SimpleListTask from "core/entity/Task/ui/simple/list/SimpleListTask";
import cl from './_AddExistsTaskCreateOrAddTaskModal.module.scss'

interface AddExistsTaskCreateOrAddTaskModalProps {
    addTask: Function
    onBackClick: Function
    className?: string
}

const AddExistsTaskCreateOrAddTaskModal = ({onBackClick, addTask, className}: AddExistsTaskCreateOrAddTaskModalProps) => {
    const [selectTask, setSelectTask] = useState<ITask>()
    const handleOnSuccessClick = () => {
        if (selectTask === undefined)
            return
        addTask(selectTask)
    }

    const handleOnTaskClick = (task: ITask) => {
        setSelectTask(task)
    }

    return (
        <InListModal titleBack={"Назад"} onClickBack={onBackClick}
                     titleSuccess={"Создать"} onClickSuccess={handleOnSuccessClick}
                     description={"Выберите задачу"} className={className}>
            <SimpleListTask onClick={handleOnTaskClick} className={cl.list} />
        </InListModal>
    );
};

export default AddExistsTaskCreateOrAddTaskModal;