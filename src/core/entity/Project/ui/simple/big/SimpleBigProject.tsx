import React from 'react';
import cl from './_SimpleBigProject.module.scss'
import {IProject} from "core/entity/Project/model/model";
import {cls} from "core/service/cls";
import EntityImage, {EEntityImageVariant} from "core/components/EntityImage/EntityImage";

interface SimpleBigProjectProps {
    project: IProject
    className?: string
}

const SimpleBigProject = ({project, className}: SimpleBigProjectProps) => {
    return (
        <div className={cls(cl.block ,className)}>
            <EntityImage src={project.image}
                         title={project.name}
                         variant={EEntityImageVariant.PROJECT}
                         className={cl.image}/>
            <div className={cl.right}>
                <span className={cl.hint}>Проект:</span>
                <span className={cl.project}>{project.name}</span>
            </div>
        </div>
    );
};

export default SimpleBigProject;
