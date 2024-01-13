import React from 'react';
import cl from './_SimpleListItemProject.module.scss'
import {cls} from "core/service/cls";
import checkSVG from "core/static/img/complete-fill-green.svg"

import {IProject} from "core/entity/Project/model/model";


interface SimpleListItemProjectProps {
    project: IProject
    isSelect?: boolean
    onClick?: (project: IProject) => void
    className?: string
}

const SimpleListItemProject = ({project, isSelect=false, onClick, className}: SimpleListItemProjectProps) => {

    const handleOnClick = () => {
        if (onClick)
            onClick(project)
    }

    return (
        <div className={cls(cl.project, className)} onClick={handleOnClick}>
            <span className={cl.name}>{project.name}</span>
            <div className={cl.navigation}>
                {isSelect &&
                    <img src={checkSVG} alt="complete" className={cl.check}/>
                }
            </div>
        </div>
    );
};

export default SimpleListItemProject;