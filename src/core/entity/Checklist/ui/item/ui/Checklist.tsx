import React, { useEffect, useState } from 'react';
import cl from './_Checklist.module.scss'
import arrowSVG from 'core/static/img/arrow-fill-white.svg'
import deleteSVG from 'core/static/img/delete-fill-white.svg'
import { IChecklist } from '../../../model/model';
import ChecklistCompletedSubtaskProps from '../components/completed/ui/ChecklistCompletedSubtask';
import { cls } from 'core/service/cls';
import { updateChecklist } from 'core/entity/Checklist/api/ChecklistApi';
import SubtaskList from 'core/entity/Subtask/ui/list/SubtaskList';
import {ISubtask} from "core/entity/Subtask/model/model";
import {updateSubtaskFromChecklist} from "core/entity/Checklist/service/service";
import {createSubtaskAPI, deleteSubtaskAPI} from "core/entity/Subtask/api/SubtaskApi";

interface ChecklistProps {
    checklist: IChecklist
    deleteChecklist?: (checklistId: number) => void
    isOpen?: boolean
    className?: string
}

const Checklist = ({checklist, deleteChecklist, isOpen=false, className=''}: ChecklistProps) => {
    // STATE
    const [isOpenChecklist, setIsOpenChecklist] = useState(isOpen)
    const [checklistLocal, setChecklistLocal] = useState<IChecklist>(checklist)
    const [isLoadingCreation, setIsLoadingCreation] = useState<boolean>(false)

    // EFFECT
    useEffect(() => {
        setChecklistLocal(checklist)
    }, [checklist])


    // ==={  FUNCTIONS  }===
    // ОТКРЫТИЕ | ЗАКРЫТИЕ ЧЕКЛИСТА
    const toggleChecklist = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const isInput = (event.target as HTMLElement).closest('input') !== null;
        const isDelete = (event.target as HTMLElement).closest(`.${cl.delete}`) !== null;

        if (!isInput && !isDelete) {
            setIsOpenChecklist(!isOpenChecklist);
        }
    }

    // ОБНОВЛЕНИЕ ПОДЗАДАЧ ВНУТРИ ЧЕКЛИСТА
    const updateSubtasks = (subtasks: ISubtask[]) => {
        setChecklistLocal(updateSubtaskFromChecklist(checklistLocal, subtasks))
    }

    // ИЗМЕНЕНИЕ НАЗВАНИЯ ЧЕКЛИСТА
    const handleOnChangeTitle = (value: string) => {
        if (value.trim().length === 0) return
        updateChecklist(checklistLocal.id, {body: {name: value}}).then()
        setChecklistLocal((prevChecklist) => ({...prevChecklist, name: value}));

    }

    // УДАЛЕНИЕ ПОДЗАДАЧИ
    const deleteSubtask = (subtaskId: ISubtask['id']) => {
        let currentChecklist = {...checklistLocal}

        deleteSubtaskAPI(subtaskId).catch(() => {
            setChecklistLocal(currentChecklist)
        })

        setChecklistLocal(prevState => {
            if (!prevState.subtasks) return prevState
            const updatedSubtasks = prevState.subtasks.filter(it => it.id !== subtaskId)
            return updateSubtaskFromChecklist(prevState, updatedSubtasks)
        })
    }

    // СОЗДАНИЕ ПОДЗАДАЧИ
    const createSubtask = () => {
        setIsLoadingCreation(true)
        createSubtaskAPI(checklistLocal.id).then(r => {
            setChecklistLocal(prevState => {
                let currentSubtask: ISubtask[] = []
                if (prevState.subtasks)
                    currentSubtask = prevState.subtasks
                setIsLoadingCreation(false)
                return updateSubtaskFromChecklist(prevState, [...currentSubtask, r])
            })
        })
    }

    return (
        <div className={cls(cl.block, className, isOpenChecklist ? cl.open : '')}>
            <div className={cl.top} onClick={toggleChecklist}>
                <input value={checklistLocal.name}
                       type="textarea"
                       className={cl.title} onChange={e => handleOnChangeTitle(e.target.value)} />
                <div className={cl.right}>
                    {checklistLocal.infoCompletedSubtask &&
                        <ChecklistCompletedSubtaskProps infoSubtask={checklistLocal.infoCompletedSubtask} />
                    }
                    <button className={cl.arrow}>
                        <img src={arrowSVG} alt='Arrow' />
                    </button>

                    {deleteChecklist &&
                        <button className={cl.delete} onClick={() => deleteChecklist(checklist.id)}>
                            <img src={deleteSVG} alt='delete'/>
                        </button>
                    }
                </div>
            </div>
            <div className={cl.subtasks}>
                <div className={cl.line} />
                <SubtaskList subtasks={checklistLocal.subtasks}
                             createSubtask={createSubtask}
                             isLoadingCreation={isLoadingCreation}
                             updateSubtasks={updateSubtasks}
                             deleteSubtask={deleteSubtask} />
            </div>
        </div>
    );
};

export default Checklist;