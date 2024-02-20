import {ITask} from "core/entity/Task/model/model";
import {ISection} from "core/widget/Section/model/model";

export interface ITaskSection extends ISection {
    body?: ITask[];
}
