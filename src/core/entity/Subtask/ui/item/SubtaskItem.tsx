import React, {useEffect, useState} from 'react';
import deleteSVG from 'core/static/img/delete-fill-white.svg'
import cl from './_SubtaskItem.module.scss';
import { cls } from 'core/service/cls';
import { ISubtask } from '../../model/model';
import {updateSubtaskAPI} from '../../api/SubtaskApi';

interface SubtaskItemProps {
    subtask: ISubtask
    updateSubtaskByParent?: (subtask: ISubtask) => void
    deleteSubtask?: (subtaskId: ISubtask['id']) => void
    className?: string
}

const SubtaskItem = ({subtask, updateSubtaskByParent = () => {}, deleteSubtask = () => {}, className=''}: SubtaskItemProps) => {
    const [subtaskLocal, setSubtaskLocal] = useState<ISubtask>(subtask)

    useEffect(() => {
        setSubtaskLocal(subtask)
    }, [subtask])


    // ЗАПРОС НА ВЫПОЛНЕНИЕ ПОДЗАДАЧИ
    const handleOnClickRadio = () => {
        let completedAt: string | null = null
        if (!subtaskLocal.completed_at) {
            completedAt = new Date().toISOString()
        }

        const currentSubtask = {...subtaskLocal}
        updateSubtaskAPI(subtask.id, {completed_at: completedAt}).catch(() => {
            setSubtaskLocal(currentSubtask)
            updateSubtaskByParent(currentSubtask)
        })

        setSubtaskLocal(prevState => {
            const updatedSubtask = {...prevState, completed_at: completedAt}
            updateSubtaskByParent(updatedSubtask)
            return updatedSubtask
        });
    }

    // ИЗМЕНЕНИЕ ТЕКСТА В ПОДЗАДАЧЕ
    const handleOnChangeText = (text: string) => {
        const isEmptyText = !text

        const currentSubtask = {...subtaskLocal}
        if (!isEmptyText) {
            updateSubtaskAPI(subtask.id, {name: text}).catch(() => {
                setSubtaskLocal(currentSubtask)
                updateSubtaskByParent(currentSubtask)
            })
        }

        setSubtaskLocal(prevState => {
            const updatedSubtask = {...prevState, name: text}
            if (!isEmptyText)
                updateSubtaskByParent(updatedSubtask)
            return updatedSubtask
        });
    }

    // УДАЛЕНИЕ ПОДЗАДАЧИ
    const handleOnClickDelete = () => {
        deleteSubtask(subtask.id)
    }

    return (
        <label className={cls(cl.subtask, className, !!subtaskLocal.completed_at ? cl.completed : '')}>
            <button className={cl.circle} onClick={handleOnClickRadio}>
                 <span className={cl.fillCircle} />
            </button>
            <input type={"text"} 
                   defaultValue={subtaskLocal.name}
                   className={cl.text}
                   onChange={e => handleOnChangeText(e.target.value)}/>
            <button className={cl.delete} onClick={handleOnClickDelete}>
                <img src={deleteSVG} alt={'delete'} />
            </button>
        </label>
    );
};

export default SubtaskItem;