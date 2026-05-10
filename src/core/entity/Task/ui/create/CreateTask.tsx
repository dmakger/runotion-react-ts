import React, {useState} from 'react';
import {ITask} from "core/entity/Task/model/model";
import CreateTaskModal from "core/modal/CreateTask/ui/CreateTaskModal";
import Button from 'core/components/Button/ui/parent/Button';
import { createTaskAPI } from '../../api/TaskApi';

interface CreateTaskProps {
    projectId?: number
    onClick?: (task: ITask) => void
    className?: string
}

const CreateTask = ({projectId, onClick}: CreateTaskProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useState(false)

    const handleOnClick = () => {
        if (projectId === undefined){
            setIsVisibleModal(true)
            return
        }
        createTaskAPI({project_id: projectId}).then(r => {
            console.log(r);
            if (onClick)
                onClick(r)
        })

    }

    return (
        <>
            <CreateTaskModal onClick={onClick}
                             isLoadingRequest={isLoading}
                             setIsLoadingRequest={setIsLoading}
                             isVisible={isVisibleModal}
                             setIsVisible={setIsVisibleModal}/>
            <Button.Green onClick={handleOnClick} title={isLoading ? 'Добавление...' : 'Добавить задачу'} />
        </>
    );
};

export default CreateTask;
