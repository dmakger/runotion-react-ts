import React from 'react';

import taskFlag from 'core/static/img/task-flag.svg';
import cl from './_TaskCode.module.scss'
import { cls } from 'core/service/cls';

interface TaskCodeProps {
    code: string
    className?: string
    classNameImage?: string
    classNameCode?: string
}

const TaskCode = ({code, className='', classNameImage, classNameCode}: TaskCodeProps) => {
    return (
        <div className={cls(cl.task, className)}>
            <img src={taskFlag} alt={code} className={cls(cl.image, classNameImage)} />
            <span className={cls(cl.code, classNameCode)}>{code}</span>
        </div>
    );
};

export default TaskCode;