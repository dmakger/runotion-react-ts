import {IItemLeftMenuRedux} from "core/entity/LeftMenu/model/model";
import ProjectSVG from "core/static/img/project-outlined.svg";
import {ALL_PROJECT__MAIN_URL, CHART__MAIN_URL, TASK__MAIN_URL} from "main/router/urlRouter";
import TaskSVG from "core/static/img/task-fill-white.svg";
import ChartSVG from "core/static/img/chart-outlined.svg";


export const ProjectItemLeftMenu: IItemLeftMenuRedux = {
    title: 'Проекты',
    image: ProjectSVG,
    to: ALL_PROJECT__MAIN_URL,
}

export const TaskItemLeftMenu: IItemLeftMenuRedux = {
    title: 'Задачи',
    image: TaskSVG,
    to: TASK__MAIN_URL,
}

export const ChartItemLeftMenu: IItemLeftMenuRedux = {
    title: 'Статистика',
    image: ChartSVG,
    to: CHART__MAIN_URL,
}


export const DATA_LEFT_MENU: IItemLeftMenuRedux[] = [
    ProjectItemLeftMenu,
    TaskItemLeftMenu,
    ChartItemLeftMenu,
]