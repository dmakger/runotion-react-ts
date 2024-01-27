import {ITaskByQuarter} from "core/widget/Chart/model/model";

export const taskByQuarterToChat = (dataKey: string, data: ITaskByQuarter[]) => {
    return data.map(it => ({
        name: dataKey,
        [dataKey]: it.amount,
        text: `${it.quarter} квартал. ${it.year} год. ${it.amount}`
    }))
};