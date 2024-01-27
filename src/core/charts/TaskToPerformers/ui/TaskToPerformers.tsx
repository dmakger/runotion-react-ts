import React, {useEffect, useState} from 'react';
import {taskToPerformersAPI} from "core/widget/Chart/api/ChartApi";
import {IChartPayload} from "core/widget/Chart/model/model";
import {taskToPerformersToChat} from "core/charts/TaskToPerformers/service/service"
import PieChartWrapper from "core/widget/Chart/ui/Pie/PieChartWrapper";

interface TaskToPerformersProps {
    projects?: number[],
    users?: number[],
    levels?: number[]
}

const TaskToPerformers = ({projects=[], users=[], levels=[]}: TaskToPerformersProps) => {
    const dataKey = "Исполнитель"
    const title = "Всего задач по исполнителям"

    // STATE
    const [data, setData] = useState<IChartPayload[]>()

    // EFFECT
    useEffect(() => {
        const body = {
            projects: projects,
            users: users,
            levels: levels
        }
        taskToPerformersAPI(body).then(r => {
            const formattedData = taskToPerformersToChat(dataKey, r)
            console.log('formattedData', formattedData)
            // const formattedData: IChartPayload[] = [
            //     {name: 'qweqweqwe', [dataKey]: 123},
            //     {name: 'er', [dataKey]: 100},
            //     {name: '123123123123', [dataKey]: 999},
            //     {name: '123123123123', [dataKey]: 999},
            //     {name: '123123123123', [dataKey]: 999},
            //     {name: '123123123123', [dataKey]: 999},
            //     {name: '123123123123', [dataKey]: 999},
            // ]
            setData(formattedData)
        })
    }, [levels, users, projects])

    return (
        <PieChartWrapper title={title} dataKey={dataKey} data={data} />
    );
};

export default TaskToPerformers;