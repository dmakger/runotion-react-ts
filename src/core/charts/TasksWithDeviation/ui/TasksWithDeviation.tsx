import React, {useEffect, useState} from 'react';
import BarChartWrapper from "core/widget/Chart/ui/Bar/BarChartWrapper";
import {tasksWithDeviationAPI} from "core/widget/Chart/api/ChartApi";
import {tasksWithDeviationToChat} from "core/charts/TasksWithDeviation/service/service";
import {IChartPayload, ITasksWithDeviation} from "core/widget/Chart/model/model";

interface TasksWithDeviationProps {
    projects?: number[],
    users?: number[],
    levels?: number[]
}

const TasksWithDeviation = ({projects=[], users=[], levels=[]}: TasksWithDeviationProps) => {
    const dataKey = "Количество задач"
    const title = "Количество  задач с отклонением, дни"

    // STATE
    const [data, setData] = useState<IChartPayload[]>()

    // EFFECT
    useEffect(() => {
        const body = {
            projects: projects,
            users: users,
            levels: levels
        }
        tasksWithDeviationAPI(body).then(r => {
            const formattedData = tasksWithDeviationToChat(dataKey, r as ITasksWithDeviation)
            setData(formattedData)
        })
    }, [levels, users, projects])

    return (
        <BarChartWrapper title={title} dataKey={dataKey} data={data} />
    );
};

export default TasksWithDeviation;