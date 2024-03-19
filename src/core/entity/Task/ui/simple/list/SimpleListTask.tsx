import React, {useEffect, useState} from 'react';
import {cls} from "core/service/cls";
import cl from './_SimpleListTask.module.scss'
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITask} from "core/entity/Task/model/model";
import {getTasksAPI} from "core/entity/Task/api/TaskApi";
import {IArgsRequest} from "core/api/model/model";
import {DATA_PARAMS_TASK} from "core/entity/Task/data/data";
import SimpleListItemTask from "core/entity/Task/ui/simple/item/SimpleListItemTask";


interface SimpleListProjectProps {
    onClick?: (task: ITask) => void
    projectId?: number
    notHasSection?: boolean
    className?: string
    classNameItem?: string
}

const SimpleListTask = ({onClick, projectId, notHasSection=true, className, classNameItem}: SimpleListProjectProps) => {
    // STATE
    const [listTask, setListTask] = useState<ITask[]>([])
    const [isLoadingListProject, setIsLoadingListProject] = useState(true)
    const [selectTask, setSelectTask] = useState<ITask>()

    // FUNC
    const handleOnClickProject = (task: ITask) => {
        if (onClick)
            onClick(task)
        if (task === selectTask)
            setSelectTask(undefined)
        else
            setSelectTask(task)
    }

    // EFFECT
    useEffect(() => {
        let body = {
            has_section: !notHasSection
        } as IArgsRequest["body"]
        if (projectId !== undefined && body)
            body['project_id'] = projectId
        getTasksAPI(DATA_PARAMS_TASK, body)
        .then(r => {
            setListTask(r.results)
        })
        .finally(() => {
            setIsLoadingListProject(false)
        })
    }, [notHasSection, projectId])

    return (
        <LoadingWrapper isLoading={isLoadingListProject}>
            <div className={cls(cl.list, className)}>
                {listTask.map(it => (
                    <SimpleListItemTask task={it}
                                        onClick={handleOnClickProject}
                                        isSelect={selectTask === it}
                                        className={cls(cl.project, classNameItem)}
                                        key={it.id} />
                ))}
            </div>
        </LoadingWrapper>
    );
};

export default SimpleListTask;