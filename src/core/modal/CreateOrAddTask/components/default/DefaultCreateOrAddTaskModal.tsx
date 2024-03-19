import React from 'react';
import cl from "./_DefaultCreateOrAddTaskModal.module.scss";
import ModalCard from "core/modal/core/ui/components/card/ModalCard";
import {cls} from "core/service/cls";

interface DefaultCreateOrAddTaskModalProps {
    addTask: Function
    createTask: Function
    className?: string
}

const DefaultCreateOrAddTaskModal = ({addTask, createTask, className}: DefaultCreateOrAddTaskModalProps) => {

    return (
        <div className={cls(cl.cards, className)}>
            <ModalCard onClick={addTask} title={'Добавить существующию задачу'}/>
            <ModalCard onClick={createTask} title={'Создать задачу'}/>
        </div>
    );
};

export default DefaultCreateOrAddTaskModal;