import React, {useState} from 'react';
import {ITask} from "core/entity/Task/model/model";
import CreateTaskModal from "core/modal/CreateTask/ui/CreateTaskModal";
import Button from 'core/components/Button/ui/parent/Button';
import { createTaskAPI } from '../../api/TaskApi';
import {useLocation} from "react-router-dom";
import {useUrlModalState} from "core/modal/core/hooks/useUrlModalState";

interface CreateTaskProps {
    projectId?: number
    onClick?: (task: ITask) => void
    className?: string
}

const CreateTask = ({projectId, onClick}: CreateTaskProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useUrlModalState('create-task')
    const location = useLocation()
    const projectIdFromPath = location.pathname.match(/^\/project\/([^/]+)\/task/)?.[1]
    const currentProjectId = projectId || (projectIdFromPath ? parseInt(projectIdFromPath) : undefined)

    const handleOnClick = () => {
        if (currentProjectId === undefined){
            setIsVisibleModal(true)
            return
        }

        setIsLoading(true)
        createTaskAPI({project_id: currentProjectId}).then((r: ITask) => {
            if (onClick)
                onClick(r)
            window.dispatchEvent(new CustomEvent('runotion:task-created', {
                detail: {
                    task: r,
                    projectId: currentProjectId,
                }
            }))
        }).finally(() => {
            setIsLoading(false)
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
