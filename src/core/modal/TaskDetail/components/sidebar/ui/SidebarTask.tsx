import React from 'react';
import {cls} from "core/service/cls";
import cl from './_SidebarTask.module.scss'
import {ITask} from "core/entity/Task/model/model";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import TextBlockSidebarTask from "core/modal/TaskDetail/components/sidebar/components/block/text/TextBlockSidebarTask";
import UsersBlockSidebarTask
    from "core/modal/TaskDetail/components/sidebar/components/block/users/ui/UsersBlockSidebarTask";
import CompleteButtonSidebarTask
    from "core/modal/TaskDetail/components/sidebar/components/complete/CompleteButtonSidebarTask";
import CategoryBlockSidebarTask
    from "core/modal/TaskDetail/components/sidebar/components/category/CategoryBlockSidebarTask";
import StageBlockSidebarTask
    from "core/modal/TaskDetail/components/sidebar/components/stage/StageBlockSidebarTask";

interface SidebarTaskProps {
    task?: ITask
    onTaskChange?: (task: ITask) => void
    className?: string
}

const SidebarTask = ({task, onTaskChange, className}: SidebarTaskProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={task === undefined}>
                {task !== undefined &&
                    <>
                        <CompleteButtonSidebarTask task={task}
                                                   isCompleted={!!task.completed_at}
                                                   onTaskChange={onTaskChange}/>
                        <StageBlockSidebarTask task={task} onTaskChange={onTaskChange}/>
                        <CategoryBlockSidebarTask task={task} onTaskChange={onTaskChange}/>
                        <TextBlockSidebarTask task={task}/>
                        <UsersBlockSidebarTask task={task} onTaskChange={onTaskChange}/>
                    </>
                }
            </LoadingWrapper>
        </div>
    );
};

export default SidebarTask;
