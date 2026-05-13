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

interface TaskTableProps {
    projectId?: number
    className?: string
}

const TaskTable = ({projectId, className}: TaskTableProps) => {
    // STATE
    const [tableData, setTableData] = useState<ITable>()
    const [activeID, setActiveID] = useState<number>()
    const [isVisible, setIsVisible] = useState(false)


    // FUNC
    const handleOnLineClick = useCallback((task: ICellTable | undefined) => {
        if (task === undefined || task?.id === -1) return
        setActiveID(task.id)
        setIsVisible(true)
    }, [])

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
            <TaskDetailModal isVisible={isVisible} setIsVisible={setIsVisible} id={activeID}/>

            <Table table={tableData} className={cls(cl.table, className)}/>
        </>
    );
};

export default TaskTable;
