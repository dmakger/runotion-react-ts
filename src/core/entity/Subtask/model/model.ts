import {IQuery} from "core/entity/core/model/model";

// SUBTASK
export interface ISubtask {
    id: number
    name: string
    position?: number
    created_at: string
    completed_at?: string | null
}

// QUERY SUBTASK
export interface IQueryToSubtask extends IQuery{
    results: ISubtask[]
}

// INFO ABOUT COUNT TASK
export interface IInfoCompletedSubtask {
    all: number
    completed: number
    completedList: boolean[]
}