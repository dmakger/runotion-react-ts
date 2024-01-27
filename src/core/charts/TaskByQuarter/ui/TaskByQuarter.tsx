import React, {useEffect, useState} from 'react';
import {taskByQuarterAPI} from "core/widget/Chart/api/ChartApi";
import {taskByQuarterToChat} from "core/charts/TaskByQuarter/service/service";
import {IChartPayload, ITaskByQuarter} from "core/widget/Chart/model/model";
import LineChartWrapper from "core/widget/Chart/ui/Line/LineChartWrapper";
import {EColors} from "core/data/data";

interface TaskByQuarterProps {
    projects?: number[],
    users?: number[],
    levels?: number[]
}

const TaskByQuarter = ({projects=[], users=[], levels=[]}: TaskByQuarterProps) => {
    const dataKey = "Количество задач"
    const title = "Количество задач по кварталам"

    // STATE
    const [data, setData] = useState<IChartPayload[]>()

    // EFFECT
    useEffect(() => {
        const body = {
            projects: projects,
            users: users,
            levels: levels
        }
        taskByQuarterAPI(body).then(r => {
            const formattedData = taskByQuarterToChat(dataKey, r as ITaskByQuarter[])
            setData(formattedData)
        })
    }, [levels, users, projects])

    return (
        <LineChartWrapper title={title} dataKey={dataKey} data={data} fill={EColors.Green}/>
    );
};

export default TaskByQuarter;