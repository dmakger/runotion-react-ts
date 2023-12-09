import React from 'react';
import cl from 'main/layout/components/LeftBar/_LeftBarMain.module.scss'
import ListLeftBarMain from "core/entity/LeftMenu/ui/list/ListLeftBarMain";
import {cls} from "core/service/cls";

interface LeftBarMainProps {
    className?: string
}

const LeftBarMain = ({className}: LeftBarMainProps) => {
    return (
        <div className={cls(cl.layout, className)}>
            <div className={cl.block}>
                <p className={cl.title}>Меню</p>
                <ListLeftBarMain />
            </div>
        </div>
    );
};

export default LeftBarMain;