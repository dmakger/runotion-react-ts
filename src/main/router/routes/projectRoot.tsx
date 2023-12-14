import { TRoute } from "core/entity/Route/model/model";
import { ALL_PROJECT__MAIN_URL } from "../urlRouter";
import ProjectPage from "main/pages/project/ProjectPage";

// PROJECTS
export const PROJECT__ROOT: TRoute = {
    key: 'project',
    route: {
        path: ALL_PROJECT__MAIN_URL,
        element: <ProjectPage/>
    },
    title: 'Проекты'
}
