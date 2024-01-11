import { TRoute } from "core/entity/Route/model/model";
import { ALL_PROJECT__MAIN_URL } from "../urlRouter";
import ProjectPage from "main/pages/Project/pages/ProjectPage";
import ProjectLayout from "main/pages/Project/layout/ProjectLayout";
import { Outlet, Route } from "react-router-dom";

// PROJECTS
export const PROJECT__ROOT: TRoute = {
    key: 'project',
    route: {
        path: ALL_PROJECT__MAIN_URL,
        element: (
            <ProjectLayout>
                <Outlet />
            </ProjectLayout>
        ),
        children: (
            <>
                <Route path={ALL_PROJECT__MAIN_URL} element={<ProjectPage />} />
            </>
        )
    },
    title: 'Проекты'
}
