import { TRoute } from "core/entity/Route/model/model";
import { PROJECT__ROOT } from "main/router/routes/projectRoot";
import { TASK__ROOT } from "main/router/routes/taskRoot";
import { CHART__ROOT } from "main/router/routes/chartRoot";


export const mainRoutes: TRoute[] = [
    PROJECT__ROOT,
    TASK__ROOT,
    CHART__ROOT,
]

