import {IChecklist} from "core/entity/Checklist/model/model";
import {IInfoCompletedSubtask, ISubtask} from "core/entity/Subtask/model/model";

export const updateSubtaskFromChecklist = (checklist: IChecklist, subtasks: ISubtask[]) => {
    return {
        ...checklist,
        subtasks: subtasks,
        infoCompletedSubtask: getInfoCompletedSubtask(subtasks)
    } as IChecklist
}


export const getInfoCompletedSubtask = (subtasks: ISubtask[]) => {
    let completed = 0
    const completedList = subtasks.map(it => {
        const isNotNull = !!it.completed_at
        if (isNotNull)
            completed += 1
        return isNotNull
    })
    return {
        all: subtasks.length,
        completed: completed,
        completedList: completedList
    } as IInfoCompletedSubtask
}