import React, {useState} from 'react';
import cl from './_CreateProject.module.scss'
import {ITask} from "core/entity/Task/model/model";
import {cls} from "core/service/cls";
import Button from 'core/components/Button/ui/parent/Button';
import { IProject } from '../../model/model';
import CreateProjectModal from 'core/modal/CreateProject/ui/CreateProjectModal';

interface CreateProjectProps {
    onClick?: (project: IProject) => void
    className?: string
}

const CreateProject = ({onClick, className}: CreateProjectProps) => {
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