import React, {useEffect, useState} from 'react';
import cl from './_LeftBarTask.module.scss'
import TaskCode from 'core/entity/Task/ui/code/TaskCode';
import {IChecklist} from 'core/entity/Checklist/model/model';
import {ITask} from 'core/entity/Task/model/model';
import {createChecklistAPI, deleteChecklistAPI, getChecklist} from 'core/entity/Checklist/api/ChecklistApi';
import {updateTaskAPI} from 'core/entity/Task/api/TaskApi';
import {cls} from 'core/service/cls';
import ChecklistList from "core/entity/Checklist/ui/list/ChecklistList";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import TaskDescription from './components/description/TaskDescription';
import TaskComments from './components/comments/TaskComments';

interface LeftBarTaskProps {
    id: number
    task: ITask
    onTaskChange?: (task: ITask) => void
    className?: string
}

const LeftBarTask = ({id, task, onTaskChange = () => {}, className}: LeftBarTaskProps) => {
    const [checklists, setChecklists] = useState<IChecklist[]>([])
    const [taskName, setTaskName] = useState(task.name)
    const [isLoadingChecklists, setIsLoadingChecklists] = useState(false)

    useEffect(() => {
        setTaskName(task.name)
    }, [task.name])

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

    const saveTaskName = () => {
        const nextName = taskName.trim()
        if (!nextName || nextName === task.name) {
            setTaskName(task.name)
            return
        }

        const optimisticTask = {...task, name: nextName}
        onTaskChange(optimisticTask)
        updateTaskAPI({id: task.id, name: nextName}).then((response: ITask) => {
            const updatedTask = {...task, ...response, name: response.name || nextName}
            onTaskChange(updatedTask)
            window.dispatchEvent(new CustomEvent('runotion:task-updated', {
                detail: {
                    task: updatedTask,
                    projectId: task.project.id,
                }
            }))
        }).catch(() => {
            setTaskName(task.name)
            onTaskChange(task)
        })
    }

    return (
        <div className={cls(cl.left, className)}>
            <div className={cl.top}>
                <input className={cl.title}
                       value={taskName}
                       onChange={(event) => setTaskName(event.target.value)}
                       onBlur={saveTaskName}
                       onKeyDown={(event) => {
                           if (event.key === 'Enter') event.currentTarget.blur()
                           if (event.key === 'Escape') {
                               setTaskName(task.name)
                               event.currentTarget.blur()
                           }
                       }}
                       aria-label="Название задачи"/>
                <TaskCode code={task.code} className={cl.code}/>
            </div>
            <TaskDescription task={task} onTaskChange={onTaskChange}/>
            <LoadingWrapper isLoading={isLoadingChecklists}>
                <ChecklistList checklistList={checklists}
                               createChecklist={createChecklist}
                               deleteChecklist={deleteChecklist}/>
            </LoadingWrapper>
            <TaskComments taskId={id}/>
        </div>
    );
};

export default LeftBarTask;
