import React, {useEffect, useState} from 'react';
import SimpleBigProject from "core/entity/Project/ui/simple/big/SimpleBigProject";
import {IProject} from "core/entity/Project/model/model";
import {getProjectIdFromURL} from "core/entity/Project/service/service";
import {getProjectByIdAPI} from "core/entity/Project/api/ProjectApi";
import ProjectSettingsModal from "core/modal/ProjectSettings/ui/ProjectSettingsModal";
import {useUrlModalState} from "core/modal/core/hooks/useUrlModalState";

interface ProjectLeftBarMainProps {
    className?: string
}

const ProjectLeftBarMain = ({className}: ProjectLeftBarMainProps) => {
    // STATE
    const [project, setProject] = useState<IProject>()
    const [isSettingsVisible, setIsSettingsVisible] = useUrlModalState('project-settings')

    const projectId = getProjectIdFromURL()
    
    // EFFECT
    useEffect(() => {
        if (projectId === null) {
            setProject(undefined)
            return
        }
        getProjectByIdAPI(projectId).then(r => {
            setProject(r)
        })
    }, [projectId])

    if (project === undefined) return <></>

    return (
        <>
            <SimpleBigProject project={project}
                              onSettingsClick={() => setIsSettingsVisible(true)}
                              className={className}/>
            <ProjectSettingsModal project={project}
                                  isVisible={isSettingsVisible}
                                  setIsVisible={setIsSettingsVisible}
                                  onProjectChange={setProject}/>
        </>
    );
};

export default ProjectLeftBarMain;
