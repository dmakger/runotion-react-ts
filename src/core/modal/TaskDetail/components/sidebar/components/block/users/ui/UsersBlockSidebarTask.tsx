import React from 'react';
import {cls} from "core/service/cls";
import cl from "core/modal/TaskDetail/components/sidebar/components/block/users/ui/_UsersBlockSidebarTask.module.scss";
import {ITask} from "core/entity/Task/model/model";
import User from "core/entity/User/ui/user/User";
import {IUsersBlockSidebarTaskData} from "core/modal/TaskDetail/components/sidebar/components/block/users/model/model";
import AddUser from "core/entity/User/ui/add/AddUser";


interface UsersBlockSidebarTaskProps {
    task: ITask
    className?: string
}


const UsersBlockSidebarTask = ({task, className}: UsersBlockSidebarTaskProps) => {
    const data: IUsersBlockSidebarTaskData[] = [
        {title: 'Поставщик', data: [task.director]},
        {title: 'Ответственный', data: [task.responsible] as IUsersBlockSidebarTaskData['data']},
        {title: 'Соисполнители', data: task.collaborators as IUsersBlockSidebarTaskData['data']},
        {title: 'Наблюдатели', data: task.observers as IUsersBlockSidebarTaskData['data']},
    ]


    return (
        <div className={cls(cl.block, className)}>
            {data.map((it, index) => (
                <div className={cl.item} key={index}>
                    <div className={cl.top}>
                        <span className={cl.title}>{it.title}:</span>
                    </div>
                    <div className={cl.line}/>

                    <div className={cl.list}>
                        {it.data.map(user => (
                            user && <User user={user} key={user.id}/>
                        ))}
                        {index > 1 &&
                            <AddUser className={cl.addUser} />
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersBlockSidebarTask;