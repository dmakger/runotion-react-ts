import {RouteProps} from "react-router-dom";
import {ALL_PROJECT__MAIN_URL, CHART__MAIN_URL, TASK__MAIN_URL} from "main/router/urlRouter";
import TaskPage from "main/pages/task/TaskPage";
import ProjectPage from "main/pages/project/ProjectPage";
import ChartPage from "main/pages/chart/ChartPage";


export const mainRoutes: RouteProps[] = [
    {
        path: ALL_PROJECT__MAIN_URL,
        element: <ProjectPage/>
    },
    {
        path: TASK__MAIN_URL,
        element: <TaskPage/>
    },
    {
        path: CHART__MAIN_URL,
        element: <ChartPage/>
    },
]

