import { TRoute } from "core/entity/Route/model/model";
import { TASK__MAIN_URL } from "../urlRouter";
import TaskPage from "main/pages/task/TaskPage";


// TASK
export const TASK__ROOT: TRoute = {
    key: 'task',
    route: {
        path: TASK__MAIN_URL,
        element: <TaskPage/>
    },
    title: 'Задачи'
}