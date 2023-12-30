import React, {useEffect, useState} from 'react';
import {getTasks} from "core/entity/Task/api/TaskApi";
import {DATA_PARAMS_TASK} from "core/entity/Task/data/data";
import Table from "core/widget/Table/ui/Table";
import {ITable} from "core/widget/Table/model/model";
import {DATA_HEADER_TASK_TABLE} from "core/tables/Task/data/data";
import {taskListToTableContent} from "core/tables/Task/service/service";
import TaskDetailModal from "core/modal/TaskDetail/ui/TaskDetailModal";

interface TaskTableProps {
    className?: string
}

const TaskTable = ({className}: TaskTableProps) => {
    const [tableData, setTableData] = useState<ITable>()
    const [activeID, setActiveID] = useState<number>()
    const [isVisible, setIsVisible] = useState(false)

    const handleOnLineClick = (taskID: number | undefined = -1) => {
        if (taskID === -1) return
        setActiveID(taskID)
        setIsVisible(true)
    }

    useEffect(() => {
        getTasks(DATA_PARAMS_TASK).then(r => {
            setTableData({
                header: DATA_HEADER_TASK_TABLE,
                content: taskListToTableContent(r.results),
                onLineClick: handleOnLineClick,
            })
        });
    }, []);


    return (
        <>
            <TaskDetailModal isVisible={isVisible} setIsVisible={setIsVisible} id={activeID}/>
            {tableData &&
                <Table table={tableData} className={className}/>
            }
        </>
    );
};

export default TaskTable;