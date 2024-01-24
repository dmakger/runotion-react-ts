import React, {useEffect, useState} from 'react';
import SimpleBigProject from "core/entity/Project/ui/simple/big/SimpleBigProject";
import {IProject} from "core/entity/Project/model/model";
import {getProjectIdFromURL} from "core/entity/Project/service/service";
import {getProjectByIdAPI} from "core/entity/Project/api/ProjectApi";

interface ProjectLeftBarMainProps {
    className?: string
}

const ProjectLeftBarMain = ({className}: ProjectLeftBarMainProps) => {
    // STATE
    const [project, setProject] = useState<IProject>()

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
        <SimpleBigProject project={project} className={className} />
    );
};

export default ProjectLeftBarMain;