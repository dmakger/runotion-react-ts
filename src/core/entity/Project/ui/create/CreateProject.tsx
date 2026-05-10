import React, {useState} from 'react';
import Button from 'core/components/Button/ui/parent/Button';
import { IProject } from '../../model/model';
import CreateProjectModal from 'core/modal/CreateProject/ui/CreateProjectModal';

interface CreateProjectProps {
    onClick?: (project: IProject) => void
    className?: string
}

const CreateProject = ({onClick}: CreateProjectProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibleModal, setIsVisibleModal] = useState(false)

    const handleOnClick = () => {
        setIsVisibleModal(true)
    }

    return (
        <>
            <CreateProjectModal onClick={onClick}
                             isLoadingRequest={isLoading}
                             setIsLoadingRequest={setIsLoading}
                             isVisible={isVisibleModal}
                             setIsVisible={setIsVisibleModal}/>
            <Button.Green onClick={handleOnClick} title={isLoading ? 'Создание...' : 'Создать проект'} />
        </>
    );
};

export default CreateProject;
