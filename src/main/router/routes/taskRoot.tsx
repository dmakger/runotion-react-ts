import { TRoute } from "core/entity/Route/model/model";
import {TASK__MAIN_URL, TASK_GANT__MAIN_URL} from "../urlRouter";
import TaskListPage from "main/pages/Task/pages/TaskListPage";
import TaskLayout from "main/pages/Task/layout/TaskLayout";
import {Route, Outlet} from "react-router-dom";
import React from "react";
import TaskGantPage from "main/pages/Task/pages/TaskGantPage";


// TASK
export const TASK__ROOT: TRoute = {
    key: 'Task',
    route: {
        element: (
            <TaskLayout>
                <Outlet />
            </TaskLayout>
        ),
        children: (
            <>
                <Route path={TASK__MAIN_URL} element={<TaskListPage />} />
                <Route path={TASK_GANT__MAIN_URL} element={<TaskGantPage />} />
            </>
        )
    },
    title: 'Задачи'
}