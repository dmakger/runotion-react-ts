import React, {useEffect, useState} from 'react';
import cl from './_LeftBarTask.module.scss'
import TaskCode from 'core/entity/Task/ui/code/TaskCode';
import {IChecklist} from 'core/entity/Checklist/model/model';
import {ITask} from 'core/entity/Task/model/model';
import {createChecklistAPI, deleteChecklistAPI, getChecklist} from 'core/entity/Checklist/api/ChecklistApi';
import {cls} from 'core/service/cls';
import ChecklistList from "core/entity/Checklist/ui/list/ChecklistList";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";

interface LeftBarTaskProps {
    id: number
    task: ITask
    className?: string
}

const LeftBarTask = ({id, task, className}: LeftBarTaskProps) => {
    const [checklists, setChecklists] = useState<IChecklist[]>([])
    const [isLoadingChecklists, setIsLoadingChecklists] = useState(false)

    useEffect(() => {
        setIsLoadingChecklists(true)
        getChecklist(id).then(r => {
            setChecklists(() => {
                setIsLoadingChecklists(false)
                return r
            })
        })
    }, [id]);

    // СОЗДАНИЕ ЧЕКЛИСТА
    const createChecklist = () => {
        createChecklistAPI(id).then(r => {
            setChecklists(prevState => [...prevState, r])
        })
    }

    // УДАЛЕНИЕ ЧЕКЛИСТА
    const deleteChecklist = (checklistId: number) => {
        deleteChecklistAPI(checklistId).then(() => {
            setChecklists(prevState => prevState.filter(it => it.id !== checklistId))
        })
    }

    return (
        <div className={cls(cl.left, className)}>
            <div className={cl.top}>
                <h2 className={cl.title}>{task.name}</h2>
                <TaskCode code={task.code} className={cl.code}/>
            </div>
            <LoadingWrapper isLoading={isLoadingChecklists}>
                <ChecklistList checklistList={checklists}
                               createChecklist={createChecklist}
                               deleteChecklist={deleteChecklist}/>
            </LoadingWrapper>
        </div>
    );
};

export default LeftBarTask;