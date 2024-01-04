import React from 'react';
import cl from './_ChecklistList.module.scss'
import {IChecklist} from "core/entity/Checklist/model/model";
import {cls} from "core/service/cls";
import Checklist from "core/entity/Checklist/ui/item/ui/Checklist";

interface ChecklistListProps {
    checklistList: IChecklist[]
    createChecklist?: () => void
    deleteChecklist?: (checklistId: number) => void
    className?: string
}

const ChecklistList = ({checklistList, deleteChecklist, createChecklist, className=''}: ChecklistListProps) => {
    console.log(checklistList)

    // НАЖАТИЕ НА СОЗДАНИЕ ЧЕКЛИСТА
    const handleOnClickCreating = () => {
        if (createChecklist)
            createChecklist()
    }

    // НАЖАТИЕ НА УДАЛЕНИЕ ЧЕКЛИСТА
    const handleOnClickDeleting = (checklistId: number) => {
        if (deleteChecklist)
            deleteChecklist(checklistId)
    }

    return (
        <div className={cls(cl.list, className)}>
            {checklistList.map((it, index) => (
                <Checklist checklist={it}
                           deleteChecklist={handleOnClickDeleting}
                           key={index}/>
            ))}
            {createChecklist &&
                <button className={cl.creationChecklist} onClick={handleOnClickCreating}>
                    <span>+ Добавить чек-лист</span>
                </button>
            }
        </div>
    );
};

export default ChecklistList;