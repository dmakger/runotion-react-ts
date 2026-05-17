import { TRoute } from "core/entity/Route/model/model";
import {
    PROJECT__ROOT,
    PROJECT__STATISTIC__ROOT,
    PROJECT__TASK__ROOT,
    PROJECT__TASK_KANBAN__ROOT
} from "main/router/routes/projectRoot";
import { TASK__ROOT } from "main/router/routes/taskRoot";
import { CHART__ROOT } from "main/router/routes/chartRoot";
import { USER_PROFILE__ROOT } from "main/router/routes/userRoot";


export const mainRoutes: TRoute[] = [
    PROJECT__ROOT,
    PROJECT__TASK__ROOT,
    PROJECT__TASK_KANBAN__ROOT,
    PROJECT__STATISTIC__ROOT,
    TASK__ROOT,
    CHART__ROOT,
    USER_PROFILE__ROOT,
]

