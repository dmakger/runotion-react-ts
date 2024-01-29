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

interface SidebarTaskProps {
    task?: ITask
    className?: string
}

const SidebarTask = ({task, className}: SidebarTaskProps) => {
    console.log(task)
    return (
        <div className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={task === undefined}>
                {task !== undefined &&
                    <>
                        <CompleteButtonSidebarTask taskId={task.id} isCompleted={task.completed_at !== null} />
                        <TextBlockSidebarTask task={task}/>
                        <UsersBlockSidebarTask task={task}/>
                    </>
                }
            </LoadingWrapper>
        </div>
    );
};

export default SidebarTask;