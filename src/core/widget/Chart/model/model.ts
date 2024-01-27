export interface IChartPayload {
    name: string
    text?: string
    [key: string]: any
}


// Количество  задач с отклонением, дни
export interface ITasksWithDeviation {
    without: number,
    sm10: number
    between10_20: number,
    lg20: number
}

// Количество  задач по кварталам
export interface ITaskByQuarter {
    year: number,
    quarter: number,
    amount: number,
}


