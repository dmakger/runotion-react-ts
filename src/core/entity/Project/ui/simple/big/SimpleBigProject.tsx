import React from 'react';
import cl from './_SimpleBigProject.module.scss'
import {IProject} from "core/entity/Project/model/model";
import {cls} from "core/service/cls";
import {getProjectImage} from "core/entity/Project/service/service";

interface SimpleBigProjectProps {
    project: IProject
    className?: string
}

const SimpleBigProject = ({project, className}: SimpleBigProjectProps) => {
    console.log(project)
    return (
        <div className={cls(cl.block ,className)}>
            <img src={getProjectImage(project.image)} alt={project.name} className={cl.image} />
            <div className={cl.right}>
                <span className={cl.hint}>Проект:</span>
                <span className={cl.project}>{project.name}</span>
            </div>
        </div>
    );
};

export default SimpleBigProject;