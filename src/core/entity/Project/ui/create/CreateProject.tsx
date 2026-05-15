import React, {useState} from 'react';
import Button from 'core/components/Button/ui/parent/Button';
import { IProject } from '../../model/model';
import CreateProjectModal from 'core/modal/CreateProject/ui/CreateProjectModal';
import {useUrlModalState} from "core/modal/core/hooks/useUrlModalState";

interface CreateProjectProps {
    onClick?: (project: IProject) => void
    className?: string
}

const CreateProject = ({onClick}: CreateProjectProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useUrlModalState('create-project')

    const handleOnClick = () => {
        setIsVisibleModal(true)
    }

    const handleProjectCreated = (project: IProject) => {
        onClick?.(project)
        window.dispatchEvent(new CustomEvent('runotion:project-created', {detail: {project}}))
    }

    return (
        <>
            <CreateProjectModal onClick={handleProjectCreated}
                             isLoadingRequest={isLoading}
                             setIsLoadingRequest={setIsLoading}
                             isVisible={isVisibleModal}
                             setIsVisible={setIsVisibleModal}/>
            <Button.Green onClick={handleOnClick} title={isLoading ? 'Создание...' : 'Создать проект'} />
        </>
    );
};

export default CreateProject;
