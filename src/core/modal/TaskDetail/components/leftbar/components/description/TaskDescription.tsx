import React, {useEffect, useState} from 'react';
import {ITask} from 'core/entity/Task/model/model';
import {updateTaskAPI} from 'core/entity/Task/api/TaskApi';
import cl from './_TaskDescription.module.scss';

interface TaskDescriptionProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
}

const TaskDescription = ({task, onTaskChange = () => {}}: TaskDescriptionProps) => {
    const [description, setDescription] = useState(task.description || '')
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        setDescription(task.description || '')
    }, [task.description])

    const saveDescription = () => {
        const nextDescription = description.trim()
        if (nextDescription === (task.description || '')) return

        const optimisticTask = {...task, description: nextDescription}
        setIsSaving(true)
        onTaskChange(optimisticTask)

        updateTaskAPI({id: task.id, description: nextDescription})
            .then((response: ITask) => {
                const updatedTask = {...task, ...response, description: response.description || nextDescription}
                onTaskChange(updatedTask)
                window.dispatchEvent(new CustomEvent('runotion:task-updated', {
                    detail: {
                        task: updatedTask,
                        projectId: task.project.id,
                    }
                }))
            })
            .catch(() => {
                setDescription(task.description || '')
                onTaskChange(task)
            })
            .finally(() => setIsSaving(false))
    }

    return (
        <section className={cl.block}>
            {isSaving && <span className={cl.status}>Сохранение...</span>}
            <textarea value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      onBlur={saveDescription}
                      placeholder="Добавить описание задачи"
                      className={cl.textarea}/>
        </section>
    );
};

export default TaskDescription;
