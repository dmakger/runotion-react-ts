import React, { useState } from 'react';
import cl from './_SubtaskItem.module.scss';
import { ISubtask } from '../../model/model';
import { cls } from 'core/service/cls';
import { updateSubtask } from '../../api/SubtaskApi';

interface SubtaskItemProps {
    subtask: ISubtask
    className?: string
}

const SubtaskItem = ({subtask, className=''}: SubtaskItemProps) => {
    const [isCompleted, setIsCompleted] = useState(!!subtask.completed_at)
    
    const handleOnClickRadio = () => {
        let completedAt = null
        if (!isCompleted) {
            completedAt = new Date()
        }        
        updateSubtask(subtask.id, {completed_at: completedAt}).then(r => (
            setIsCompleted(!!r.completed_at)
        ))
    }

    return (
        <label className={cls(cl.subtask, className, isCompleted ? cl.completed : '')}>
            <span className={cl.circle} onClick={handleOnClickRadio}>
                 <span className={cl.fillCircle} />
            </span>
            <input type={"text"} 
                   defaultValue={subtask.name} 
                   className={cl.text} />
        </label>
    );
};

export default SubtaskItem;