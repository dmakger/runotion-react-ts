import React from 'react';
import cl from './_ChecklistCompletedSubtask.module.scss'
import { cls } from 'core/service/cls';
import { IInfoCompletedSubtask } from 'core/entity/Subtask/model/model';
import ChecklistCompletedBarSubtask from '../components/bar/ChecklistCompletedBarSubtask';

interface ChecklistCompletedSubtaskProps {
    infoSubtask: IInfoCompletedSubtask
    className?: string
}

const ChecklistCompletedSubtask = ({infoSubtask, className=''}: ChecklistCompletedSubtaskProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <ChecklistCompletedBarSubtask infoSubtask={infoSubtask}/>
            <span>Выполнено: {infoSubtask.completed} из {infoSubtask.all}</span>
        </div>
    );
};

export default ChecklistCompletedSubtask;