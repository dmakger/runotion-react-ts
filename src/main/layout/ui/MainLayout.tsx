import React, {ReactNode, useEffect} from 'react';
import cl from './_MainLayout.module.scss'
import LeftBarMain from "main/layout/components/LeftBar/LeftBarMain";
import Path from 'core/entity/Path/ui/Path';
import {useAppSelector} from "core/storage/hooks";
import {useDispatch} from "react-redux";
import {TRoute} from "core/entity/Route/model/model";
import H1 from "core/components/h/1/H1";
import FunctionTopLine from "core/widget/FunctionTopLine/ui/FunctionTopLine";

interface MainLayoutProps {
    children: ReactNode,
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const dispatch = useDispatch();
    const path = useAppSelector(state => state.path);
    const [current, setCurrent] = React.useState<TRoute | undefined>(undefined);

    useEffect(() => {
        if (path.length > 0) {
            setCurrent(path[path.length - 1]);
        }
    }, [dispatch, path, setCurrent]);

    return (
        <div className={cl.layout}>
            <LeftBarMain className={cl.leftBar} />
            <div className={cl.content}>
                <Path />
                {current !== undefined &&
                    <H1>{current.title}</H1>
                }
                <FunctionTopLine />
                {children}
            </div>
        </div>
    );
};

export default MainLayout;