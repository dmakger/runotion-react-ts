import React, {useState} from 'react';
import cl from './_CreateProject.module.scss'
import {ITask} from "core/entity/Task/model/model";
import {cls} from "core/service/cls";

interface CreateTaskProps {
    onClick?: (task: ITask) => void
    className?: string
}

const CreateProject = ({onClick, className}: CreateTaskProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useState(false)

    const handleOnClick = () => {
        setIsVisibleModal(true)
    }

    return (
        <>
            {/* <CreateTaskModal onClick={onClick}
                             setIsLoadingRequest={setIsLoading}
                             isVisible={isVisibleModal}
                             setIsVisible={setIsVisibleModal}/> */}
            <button onClick={handleOnClick} className={cls(cl.button, className)}>
                {isLoading ? (
                    'Добавление...'
                ) : (
                    'Создать проект'
                )}
            </button>
        </>
    );
};

export default CreateProject;