import {IChartPayload} from "core/widget/Chart/model/model";

export const taskToPerformersToChat = (dataKey: string, data: Record<string, number>) => {
    return Object.keys(data).map((key) => (
        {name: key, [dataKey]: data[key], text: `${key}. Задач: ${data[key]}`} as IChartPayload
    ))
};