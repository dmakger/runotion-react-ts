import React, { Fragment } from 'react';
import cl from './_SubtaskList.module.scss';
import { ISubtask } from '../../model/model';
import { cls } from 'core/service/cls';
import SubtaskItem from '../item/SubtaskItem';


interface SubtaskListProps {
    subtasks?: ISubtask[]
    createSubtask?: () => void
    isLoadingCreation?: boolean
    updateSubtasks?: (subtasks: ISubtask[]) => void
    deleteSubtask?: (subtaskId: ISubtask['id']) => void
    className?: string
}

const SubtaskList = ({subtasks=[], createSubtask, isLoadingCreation=false, updateSubtasks, deleteSubtask, className=''}: SubtaskListProps) => {

    // ОБНОВЛЕНИЕ РОДИТЕЛЬСКОГО И ТЕКУЩЕГО subtask
    const updateSubtasksItem = (subtask: ISubtask) => {
        if (updateSubtasks === undefined || !subtasks) return

        updateSubtasks(subtasks.map(obj => (obj.id === subtask.id ? subtask : obj)))
    }

    const createSubtaskItem = () => {
        console.log(isLoadingCreation)
        if (isLoadingCreation || !createSubtask) return
        createSubtask()
    }

    return (
        <div className={cls(cl.list, className)}>
            {subtasks.map((it, index) => (
                <Fragment key={it.id}>
                    <SubtaskItem subtask={it}
                                 updateSubtaskByParent={updateSubtasksItem}
                                 deleteSubtask={deleteSubtask} />
                    {index < subtasks.length - 1 && <span className={cl.line} />}
                </Fragment>
            ))}

            {createSubtask && (
                <>
                    <span className={cl.line} />
                    <button className={cl.newSubtask} onClick={createSubtaskItem}>
                        <span className={cl.text}>
                            {isLoadingCreation ? 'Загрузка...' : '+ Добавить подзадачу'}
                        </span>
                    </button>
                </>
            )}
        </div>
    );
};

export default SubtaskList;