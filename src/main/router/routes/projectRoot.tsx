import { TRoute } from "core/entity/Route/model/model";
import {PROJECT__TASK__MAIN_URL, PROJECT_ALL__MAIN_URL} from "../urlRouter";
import ProjectPage from "main/pages/Project/pages/projects/ProjectPage";
import ProjectLayout from "main/pages/Project/layout/ProjectLayout";
import { Outlet, Route } from "react-router-dom";
import ProjectTaskPage from "main/pages/Project/pages/task/ProjectTaskPage";

// PROJECTS
export const PROJECT__ROOT: TRoute = {
    key: 'project',
    route: {
        path: PROJECT_ALL__MAIN_URL,
        element: (
            <ProjectLayout>
                <Outlet />
            </ProjectLayout>
        ),
        children: (
            <>
                <Route path={PROJECT_ALL__MAIN_URL} element={<ProjectPage />} />
            </>
        )
    },
    title: 'Проекты'
}


// TASK of PROJECT
export const PROJECT__TASK__ROOT: TRoute = {
    key: 'projectTask',
    route: {
        path: PROJECT__TASK__MAIN_URL,
        children: (
            <>
                <Route path={PROJECT__TASK__MAIN_URL} element={<ProjectTaskPage />} />
            </>
        )
    },
    title: 'Задачи проекта'
}
