import React, { useEffect, useState } from 'react';
import cl from './_LeftBarTask.module.scss'
import TaskCode from 'core/entity/Task/ui/code/TaskCode';
import Checklist from 'core/entity/Checklist/ui/item/ui/Checklist';
import { IChecklist } from 'core/entity/Checklist/model/model';
import { ITask } from 'core/entity/Task/model/model';
import { getChecklist } from 'core/entity/Checklist/api/ChecklistApi';
import { cls } from 'core/service/cls';

interface LeftBarTaskProps {
    id: number
    task: ITask
    className?: string
}

const LeftBarTask = ({id, task, className}: LeftBarTaskProps) => {
    const [checklists, setChecklists] = useState<IChecklist[]>([])

    useEffect(() => {
        if (id !== undefined) {
            getChecklist(id).then(r => {
                setChecklists(r)
                console.log(r);   
            })
        }
    }, [id]);

    return (
        <div className={cls(cl.left, className)}>
            <div className={cl.top}>
                <h2 className={cl.title}>{task.name}</h2>
                <TaskCode code={task.code} className={cl.code}/>    
            </div>
            <div className={cl.checklists}>
                {checklists.map(it => (
                    <Checklist checklist={it} key={it.id}/>
                ))}
            </div>
        </div>
    );
};

export default LeftBarTask;