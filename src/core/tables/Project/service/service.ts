import {ITask} from "core/entity/Task/model/model";
import {ILineTable, ITable} from "core/widget/Table/model/model";
import {objToCellTable} from "core/widget/Table/service/service";
import {formattedData} from "core/service/date";
import {IProject} from "core/entity/Project/model/model";

export const projectListToTableContent = (projects: IProject[]): ITable["content"] => {
    return projects.map(project => projectCellToTableContent(project));
};


export const projectCellToTableContent = (project: IProject) => {
    const projectCell = objToCellTable({
        obj: {
            id: project.id,
            title: project.name,
            image: project.image
        }
    });
    const adminCell = objToCellTable({
        obj: {
            id: project.admin.id,
            title: project.admin.name,
            image: project.admin.image
        }
    });
    const roleCell = objToCellTable({obj: {title: project.role?.name}, defaultText: 'Без роли'});

    return {
        id: project.id,
        line: [
            projectCell, adminCell, roleCell
        ]
    } as ILineTable
}