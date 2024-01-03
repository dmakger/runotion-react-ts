import React, { useEffect, useState } from 'react';
import cl from './_Checklist.module.scss'
import arrowSVG from 'core/static/img/arrow-fill-white.svg'
import { IChecklist } from '../../../model/model';
import ChecklistCompletedSubtaskProps from '../components/completed/ui/ChecklistCompletedSubtask';
import { cls } from 'core/service/cls';
import { updateChecklist } from 'core/entity/Checklist/api/ChecklistApi';
import SubtaskList from 'core/entity/Subtask/ui/list/SubtaskList';

interface ChecklistProps {
    checklist: IChecklist
    isOpen?: boolean
    className?: string
}

const Checklist = ({checklist, isOpen=false, className=''}: ChecklistProps) => {
    const [isOpenChecklist, setIsOpenChecklist] = useState(isOpen)
    console.log(checklist);

    const toggleChecklist = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(event.target as HTMLElement).closest('input')) {
            setIsOpenChecklist(!isOpenChecklist);
        }
    }

    const handleOnChangeTitle = (value: string) => {
        if (value.trim().length === 0) return 
        
        updateChecklist(checklist.id, {body: {name: value}}).then()
    }
    
    return (
        <div className={cls(cl.block, className, isOpenChecklist ? cl.open : '')}>
            <div className={cl.top} onClick={toggleChecklist}>
                <input defaultValue={checklist.name} 
                       type="text" 
                       className={cl.title} onChange={e => handleOnChangeTitle(e.target.value)} />
                {checklist.infoCompletedSubtask &&
                    <ChecklistCompletedSubtaskProps infoSubtask={checklist.infoCompletedSubtask} />
                }
                <img src={arrowSVG} alt='Arrow' className={cl.arrow} />
            </div>
            <SubtaskList subtasks={checklist.subtasks} />
        </div>
    );
};

export default Checklist;