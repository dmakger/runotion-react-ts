import React from 'react';
import cl from 'main/layout/components/LeftBar/ui/_LeftBarMain.module.scss'
import ListLeftBarMain from "core/entity/LeftMenu/ui/list/ListLeftBarMain";
import {cls} from "core/service/cls";
import UserLeftBarMain from "main/layout/components/LeftBar/components/User/UserLeftBarMain";

interface LeftBarMainProps {
    className?: string
}

const LeftBarMain = ({className}: LeftBarMainProps) => {
    return (
        <div className={cls(cl.layout, className)}>
            <UserLeftBarMain className={cl.user}/>
            <div className={cl.block}>
                <p className={cl.title}>Меню</p>
                <ListLeftBarMain/>
            </div>
        </div>
    );
};

export default LeftBarMain;