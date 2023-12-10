import { TRoute } from "core/entity/Route/model/model";
import { PROJECT__ROOT } from "./children/projectRoot";
import { TASK__ROOT } from "./children/taskRoot";
import { CHART__ROOT } from "./children/chartRoot";


export const mainRoutes: TRoute[] = [
    PROJECT__ROOT,
    TASK__ROOT,
    CHART__ROOT,
]

