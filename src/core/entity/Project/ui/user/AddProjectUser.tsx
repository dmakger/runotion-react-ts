import React, {useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Button from 'core/components/Button/ui/parent/Button';
import {ETypeButton} from 'core/components/Button/model/model';
import ProjectUserModal from 'core/modal/ProjectUser/ui/ProjectUserModal';

const AddProjectUser = () => {
    const {projectId} = useParams()
    const location = useLocation()
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const projectIdFromPath = location.pathname.match(/^\/project\/([^/]+)\/task/)?.[1]
    const currentProjectId = projectId || projectIdFromPath

    if (currentProjectId === undefined) return null

    return (
        <>
            <ProjectUserModal projectId={currentProjectId}
                              isVisible={isVisibleModal}
                              setIsVisible={setIsVisibleModal}/>
            <Button.Green type={ETypeButton.BUTTON}
                          onClick={() => setIsVisibleModal(true)}
                          title={'Добавить пользователя'}/>
        </>
    );
};

export default AddProjectUser;
