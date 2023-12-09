import React, {ReactNode} from 'react';
import cl from './_MainLayout.module.scss'
import LeftBarMain from "main/layout/components/LeftBar/LeftBarMain";

interface MainLayoutProps {
    children: ReactNode,
}

const MainLayout = ({children}: MainLayoutProps) => {
    return (
        <div className={cl.layout}>
            <LeftBarMain className={cl.leftBar}/>
            <div className={cl.content}>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;