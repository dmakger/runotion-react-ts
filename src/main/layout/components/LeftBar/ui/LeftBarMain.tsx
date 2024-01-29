import React from 'react';
import cl from 'main/layout/components/LeftBar/ui/_LeftBarMain.module.scss'
import ListLeftBarMain from "core/entity/LeftMenu/ui/list/ListLeftBarMain";
import {cls} from "core/service/cls";
import UserLeftBarMain from "main/layout/components/LeftBar/components/User/UserLeftBarMain";
import ProjectLeftBarMain from "main/layout/components/LeftBar/components/Project/ProjectLeftBarMain";
import Logout from "main/layout/components/LeftBar/components/logout/Logout";

interface LeftBarMainProps {
    className?: string
}

const LeftBarMain = ({className}: LeftBarMainProps) => {
    return (
        <div className={cls(cl.layout, className)}>
            <UserLeftBarMain className={cl.user}/>
            <div className={cls(cl.block, cl.section)}>
                <p className={cl.title}>Меню</p>
                <ListLeftBarMain/>
            </div>
            <ProjectLeftBarMain className={cl.section} />
            <Logout className={cl.logout} />
        </div>
    );
};

export default LeftBarMain;