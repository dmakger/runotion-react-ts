import React, {useEffect, useState} from 'react';
import {cls} from "core/service/cls";
import cl from 'core/entity/Project/ui/simple/list/_SimpleListProject.module.scss'

import SimpleListItemProject from "core/entity/Project/ui/simple/item/SimpleListItemProject";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {getProjectsAPI} from "core/entity/Project/api/ProjectApi";
import {IProject} from "core/entity/Project/model/model";


interface SimpleListProjectProps {
    onClick?: (project: IProject) => void
    className?: string
}

const SimpleListProject = ({onClick, className}: SimpleListProjectProps) => {
    // STATE
    const [listProject, setListProject] = useState<IProject[]>([])
    const [isLoadingListProject, setIsLoadingListProject] = useState(true)
    const [selectProject, setSelectProject] = useState<IProject>()

    // FUNC
    const handleOnClickProject = (project: IProject) => {
        if (onClick)
            onClick(project)
        if (project === selectProject)
            setSelectProject(undefined)
        else
            setSelectProject(project)
    }

    // EFFECT
    useEffect(() => {
        getProjectsAPI()
            .then(r => {
                setListProject(r.results)
            })
            .finally(() => {
                setIsLoadingListProject(false)
            })
    }, [])

    return (
        <LoadingWrapper isLoading={isLoadingListProject}>
            <div className={cls(cl.list, className)}>
                {listProject.map(it => (
                    <SimpleListItemProject project={it}
                                           onClick={handleOnClickProject}
                                           isSelect={selectProject === it}
                                           className={cl.project}
                                           key={it.id} />
                ))}
            </div>
        </LoadingWrapper>
    );
};

export default SimpleListProject;