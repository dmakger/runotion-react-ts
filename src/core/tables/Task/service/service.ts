import {ITask} from "core/entity/Task/model/model";
import {ILineTable, ITable} from "core/widget/Table/model/model";
import {objToCellTable} from "core/widget/Table/service/service";
import {formattedData} from "core/service/date";

export const taskListToTableContent = (tasks: ITask[]): ITable["content"] => {
    return tasks.map(task => taskCellToTableContent(task));
};


export const taskCellToTableContent = (task: ITask) => {
    const nameCell = objToCellTable({obj: {title: task.name}, defaultText: 'Без названия'});
    const deadlineCell = objToCellTable({obj: {title: formattedData(task.deadline)}, defaultText: 'Без срока'});
    const directorCell = objToCellTable({
        obj: {
            id: task.director.id,
            title: task.director.name,
            image: task.director.image
        }, defaultText: 'Без постановщика'
    });

    const responsibleCell = objToCellTable({
        obj: {
            id: task.responsible?.id,
            title: task.responsible?.name,
            image: task.responsible?.image
        },
        defaultText: 'Без ответственного'
    });

    console.log(responsibleCell)

    const projectCell = objToCellTable({
        obj: {
            id: task.project.id,
            title: task.project.name,
            image: task.project.image
        }, defaultText: 'Без проекта'
    });

    return {
        id: task.id,
        line: [
            nameCell, deadlineCell, directorCell, responsibleCell, projectCell
        ]
    } as ILineTable
}