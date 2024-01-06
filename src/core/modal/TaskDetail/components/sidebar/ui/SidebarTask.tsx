import React from 'react';
import {cls} from "core/service/cls";
import cl from './_SidebarTask.module.scss'
import {ITask} from "core/entity/Task/model/model";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import TextBlockSidebarTask from "core/modal/TaskDetail/components/sidebar/components/block/text/TextBlockSidebarTask";
import UsersBlockSidebarTask
    from "core/modal/TaskDetail/components/sidebar/components/block/users/ui/UsersBlockSidebarTask";

interface SidebarTaskProps {
    task?: ITask
    className?: string
}

const SidebarTask = ({task, className}: SidebarTaskProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={task === undefined}>
                {task !== undefined &&
                    <>
                        <TextBlockSidebarTask task={task}/>
                        <UsersBlockSidebarTask task={task}/>
                    </>
                }
            </LoadingWrapper>
        </div>
    );
};

export default SidebarTask;