import React, {useEffect} from 'react';
import {ChartItemLeftMenu} from "core/entity/LeftMenu/data/data";
import {useDispatch} from "react-redux";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {PathSlice} from "core/entity/Path/slice/slice";
import {CHART__ROOT} from "main/router/routes/chartRoot";
import TasksWithDeviation from "core/charts/TasksWithDeviation/ui/TasksWithDeviation";
import TaskToPerformers from "core/charts/TaskToPerformers/ui/TaskToPerformers";
import TaskByQuarter from "core/charts/TaskByQuarter/ui/TaskByQuarter";
import cl from './_ChartPage.module.scss'


const ChartPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(ChartItemLeftMenu));
        dispatch(PathSlice.actions.setPath([CHART__ROOT]));
    }, [dispatch]);

    return (
        <div className={cl.main}>
            <div className={cl.block}>
                <TasksWithDeviation  />
                <TaskByQuarter />
            </div>
            <TaskToPerformers />
        </div>
    );
};

export default ChartPage;