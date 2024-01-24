import React from 'react';
import cl from './_TextBlockSidebarTask.module.scss'
import {cls} from "core/service/cls";
import {formattedData} from "core/service/date";
import {ITask} from "core/entity/Task/model/model";

interface TextBlockSidebarTaskProps {
    task: ITask
    className?: string
}

const TextBlockSidebarTask = ({task, className}: TextBlockSidebarTaskProps) => {
    const data = [
        {title: 'Крайний срок', text: formattedData(task?.deadline, 'Нет')},
        {title: 'Создана', text: formattedData(task.created_at)},
    ]
    return (
        <div className={cls(cl.block, className)}>
            {data.map((it, index) => (
                // <RowSidebarTask title={it.title} text={it.text} className={cl.item}/>
                <div className={cl.item} key={index}>
                    <span className={cl.title}>{it.title}:</span>
                    {it.text &&
                        <span className={cl.text}>{it.text}</span>
                    }
                </div>
            ))}
        </div>
    );
};

export default TextBlockSidebarTask;