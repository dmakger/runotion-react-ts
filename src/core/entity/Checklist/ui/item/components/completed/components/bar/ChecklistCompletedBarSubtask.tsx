import { IInfoCompletedSubtask } from 'core/entity/Subtask/model/model';
import React from 'react';
import cl from './_ChecklistCompletedBarSubtask.module.scss';
import { cls } from 'core/service/cls';

interface ChecklistCompletedBarSubtaskProps {
    infoSubtask: IInfoCompletedSubtask
    className?: string
}

const ChecklistCompletedBarSubtask = ({infoSubtask, className}: ChecklistCompletedBarSubtaskProps) => {
    const styleItem = {
        width: `${100 / infoSubtask.all}px`
    }
    return (
        <div className={cls(cl.bar, className)}>
            {infoSubtask.completedList.map(isComplete => (
                <div className={cls(cl.item, isComplete ? cl.completed : '')} style={styleItem} />
            ))}
        </div>
    );
};

export default ChecklistCompletedBarSubtask;