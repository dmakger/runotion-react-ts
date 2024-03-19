import React from 'react';
import cl from 'core/entity/Task/ui/simple/item/_SimpleListItemTask.module.scss'
import {cls} from "core/service/cls";
import checkSVG from "core/static/img/complete-fill-green.svg"

import {IProject} from "core/entity/Project/model/model";
import {ITask} from "core/entity/Task/model/model";


interface SimpleListItemProjectProps {
    task: ITask
    isSelect?: boolean
    onClick?: (task: ITask) => void
    className?: string
}

const SimpleListItemTask = ({task, isSelect=false, onClick, className}: SimpleListItemProjectProps) => {

    const handleOnClick = () => {
        if (onClick)
            onClick(task)
    }

    return (
        <div className={cls(cl.task, className)} onClick={handleOnClick}>
            <span className={cl.name}>{task.name}</span>
            <div className={cl.navigation}>
                {isSelect &&
                    <img src={checkSVG} alt="complete" className={cl.check}/>
                }
            </div>
        </div>
    );
};

export default SimpleListItemTask;