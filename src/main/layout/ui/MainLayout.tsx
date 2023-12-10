import React, {ReactNode} from 'react';
import cl from './_MainLayout.module.scss'
import LeftBarMain from "main/layout/components/LeftBar/LeftBarMain";
import Path from 'core/entity/Path/ui/Path';

interface MainLayoutProps {
    children: ReactNode,
}

const MainLayout = ({children}: MainLayoutProps) => {
    return (
        <div className={cl.layout}>
            <LeftBarMain className={cl.leftBar}/>
            <div className={cl.content}>
                <Path />
                {children}
            </div>
        </div>
    );
};

export default MainLayout;