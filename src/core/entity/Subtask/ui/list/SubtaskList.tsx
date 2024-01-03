import React, { Fragment } from 'react';
import cl from './_SubtaskList.module.scss';
import { ISubtask } from '../../model/model';
import { cls } from 'core/service/cls';
import SubtaskItem from '../item/SubtaskItem';


interface SubtaskListProps {
    subtasks?: ISubtask[]
    className?: string
}

const SubtaskList = ({subtasks=[], className=''}: SubtaskListProps) => {
    return (
        <div className={cls(cl.list, className)}>
            {subtasks.map((it, index) => (
                <Fragment key={it.id}>
                    <SubtaskItem subtask={it} />
                    {index < subtasks.length - 1 && <span className={cl.line} />}
                </Fragment>
            ))}
        </div>
    );
};

export default SubtaskList;