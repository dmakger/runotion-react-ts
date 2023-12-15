import React, {ReactNode, useEffect} from 'react';
import cl from './_AuthLayout.module.scss'
import {useDispatch} from "react-redux";
import {useAppSelector} from "core/storage/hooks";
import {TRoute} from "core/entity/Route/model/model";
import H1 from "core/components/H/1/H1";

interface AuthLayoutProps {
    children: ReactNode
}

const AuthLayout = ({children}: AuthLayoutProps) => {
    const dispatch = useDispatch();
    const path = useAppSelector(state => state.path);
    const [current, setCurrent] = React.useState<TRoute | undefined>(undefined);

    useEffect(() => {
        if (path.length > 0)
            setCurrent(path[path.length - 1]);
    }, [dispatch, path, setCurrent]);

    return (
        <div className={cl.wrapper}>
            <div className={cl.layout}>
                {current !== undefined &&
                    <H1 className={cl.title}>{current.title}</H1>
                }
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;