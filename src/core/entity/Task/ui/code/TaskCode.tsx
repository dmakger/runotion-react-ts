import React from 'react';

import taskFlag from 'core/static/img/task-flag.svg';
import cl from './_TaskCode.module.scss'
import { cls } from 'core/service/cls';

interface TaskCodeProps {
    code: string
    className?: string
}

const TaskCode = ({code, className=''}: TaskCodeProps) => {
    return (
        <div className={cls(cl.task, className)}>
            <img src={taskFlag} alt={code} className={cl.image} />
            <span className={cl.code}>{code}</span>
        </div>
    );
};

export default TaskCode;