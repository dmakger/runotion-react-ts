import {IChartPayload, ITasksWithDeviation} from "core/widget/Chart/model/model";

export const tasksWithDeviationToChat = (dataKey: string, data: ITasksWithDeviation) => {
    return [
        {name: dataKey, [dataKey]: data.without, text: `Без просрочки: ${data.without}`},
        {name: dataKey, [dataKey]: data.sm10, text: `Просрочка 0-10: ${data.sm10}`},
        {name: dataKey, [dataKey]: data.between10_20, text: `Просрочка 10-20: ${data.between10_20}`},
        {name: dataKey, [dataKey]: data.lg20, text: `Просрочка > 20: ${data.lg20}`},
    ] as IChartPayload[]
};