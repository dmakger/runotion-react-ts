import { TRoute } from "core/entity/Route/model/model";
import {PROJECT__KANBAN__MAIN_URL, PROJECT__TASK__MAIN_URL, PROJECT_ALL__MAIN_URL} from "../urlRouter";
import ProjectPage from "main/pages/Project/pages/projects/ProjectPage";
import ProjectLayout from "main/pages/Project/layout/ProjectLayout";
import { Outlet, Route } from "react-router-dom";
import ProjectLayoutTaskPage from "main/pages/Project/pages/task/layout/ProjectLayoutTaskPage";
import {ETypeTask} from "core/entity/Task/model/model";

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
                <Route path={PROJECT__TASK__MAIN_URL} element={<ProjectLayoutTaskPage type={ETypeTask.LIST} />} />
            </>
        )
    },
    title: 'Задачи проекта',
    titlePath: 'Задачи проекта',
}

// TASK of PROJECT
export const PROJECT__TASK_KANBAN__ROOT: TRoute = {
    key: 'projectTask',
    route: {
        path: PROJECT__KANBAN__MAIN_URL,
        children: (
            <>
                <Route path={PROJECT__KANBAN__MAIN_URL} element={<ProjectLayoutTaskPage type={ETypeTask.KANBAN} />} />
            </>
        )
    },
    title: 'Задачи проекта',
    titlePath: 'Задачи проекта',
}
