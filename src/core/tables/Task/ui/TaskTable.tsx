import React, {useCallback, useEffect, useState} from 'react';
import {getTasksAPI} from "core/entity/Task/api/TaskApi";
import {DATA_PARAMS_TASK} from "core/entity/Task/data/data";
import Table from "core/widget/Table/ui/Table";
import {ICellTable, ITable} from "core/widget/Table/model/model";
import {DATA_HEADER_TASK_TABLE} from "core/tables/Task/data/data";
import {taskListToTableContent} from "core/tables/Task/service/service";
import TaskDetailModal from "core/modal/TaskDetail/ui/TaskDetailModal";
import cl from './_TaskTable.module.scss'
import {cls} from "core/service/cls";
import {IArgsRequest} from "core/api/model/model";
import {useSearchParams} from "react-router-dom";

interface TaskTableProps {
    projectId?: number
    className?: string
}

const TaskTable = ({projectId, className}: TaskTableProps) => {
    // STATE
    const [tableData, setTableData] = useState<ITable>()
    const [activeID, setActiveID] = useState<number>()
    const [isVisible, setIsVisible] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()


    // FUNC
    const setTaskParam = useCallback((taskId?: number) => {
        const nextParams = new URLSearchParams(searchParams)
        if (taskId === undefined) nextParams.delete('task')
        else nextParams.set('task', String(taskId))
        setSearchParams(nextParams)
    }, [searchParams, setSearchParams])

    const openTask = useCallback((taskId: number) => {
        setActiveID(taskId)
        setIsVisible(true)
        setTaskParam(taskId)
    }, [setTaskParam])

    const setTaskModalVisible = useCallback((nextVisible: React.SetStateAction<boolean>) => {
        setIsVisible(prev => {
            const resolvedVisible = typeof nextVisible === 'function' ? nextVisible(prev) : nextVisible
            if (!resolvedVisible) setTaskParam(undefined)
            return resolvedVisible
        })
    }, [setTaskParam])

    const handleOnLineClick = useCallback((task: ICellTable | undefined) => {
        if (task === undefined || task.id === undefined || task.id === -1) return
        openTask(task.id)
    }, [openTask])

    const loadTasks = useCallback(() => {
        let body = {project_id: projectId} as IArgsRequest["body"]
        if (projectId === undefined)
            body = undefined

        return getTasksAPI(DATA_PARAMS_TASK, body).then(r => {
            setTableData({
                header: DATA_HEADER_TASK_TABLE,
                content: taskListToTableContent(r.results),
                onLineClick: handleOnLineClick,
            })
        });
    }, [handleOnLineClick, projectId])

    // EFFECT
    useEffect(() => {
        loadTasks()
    }, [loadTasks]);

    useEffect(() => {
        const taskId = Number(searchParams.get('task'))
        if (!taskId || taskId === activeID) return

        setActiveID(taskId)
        setIsVisible(true)
    }, [activeID, searchParams]);

    useEffect(() => {
        const handleTaskChanged = (event: Event) => {
            const detail = (event as CustomEvent).detail
            const changedProjectId = detail?.projectId || detail?.task?.project?.id
            if (projectId !== undefined && changedProjectId !== projectId) return
            loadTasks()
        }

        window.addEventListener('runotion:task-created', handleTaskChanged)
        window.addEventListener('runotion:task-updated', handleTaskChanged)
        return () => {
            window.removeEventListener('runotion:task-created', handleTaskChanged)
            window.removeEventListener('runotion:task-updated', handleTaskChanged)
        }
    }, [loadTasks, projectId]);


    return (
        <>
            <TaskDetailModal isVisible={isVisible} setIsVisible={setTaskModalVisible} id={activeID}/>

            <Table table={tableData} className={cls(cl.table, className)}/>
        </>
    );
};

export default TaskTable;
