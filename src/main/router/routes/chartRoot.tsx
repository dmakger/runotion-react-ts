import { TRoute } from "core/entity/Route/model/model";
import { CHART__MAIN_URL } from "../urlRouter";
import ChartPage from "main/pages/chart/ChartPage";

// CHART
export const CHART__ROOT: TRoute = {
    key: 'chart',
    route: {
        path: CHART__MAIN_URL,
        element: <ChartPage/>
    },
    title: 'Статистика'
}