import React from 'react';
import cl from './_Checklist.module.scss'
import { IChecklist } from '../../../model/model';
import ChecklistCompletedSubtaskProps from '../components/completed/ui/ChecklistCompletedSubtask';

interface ChecklistProps {
    checklist: IChecklist
    className?: string
}

const Checklist = ({checklist, className=''}: ChecklistProps) => {
    console.log(checklist);
    
    return (
        <div className={cl.block}>
            <div className={cl.top}>
                <h3 className={cl.title}>{checklist.name}</h3>
                {checklist.infoCompletedSubtask &&
                    <ChecklistCompletedSubtaskProps infoSubtask={checklist.infoCompletedSubtask} />
                }
            </div>
        </div>
    );
};

export default Checklist;