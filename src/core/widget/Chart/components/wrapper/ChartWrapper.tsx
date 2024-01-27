import React, {ReactNode, useEffect, useState} from 'react';
import {cls} from "core/service/cls";
import cl from './_ChartWrapper.module.scss'
import LoadingLoop from "core/widget/Loading/ui/loop/LoadingLoop";

interface ChartWrapperProps {
    title?: string
    isLoading?: boolean
    children: ReactNode
    className?: string
}

const DEFAULT_TITLE = "График"

const ChartWrapper = ({title, isLoading=false, children, className}: ChartWrapperProps) => {
    // STATE
    const [titleName, setTitleName] = useState<string>(DEFAULT_TITLE)

    // EFFECT
    useEffect(() => {
        let newTitle = DEFAULT_TITLE
        if (title)
            newTitle = title
        if (newTitle === titleName) return
        setTitleName(newTitle)
    }, [title, titleName])


    // RETURN
    return (
        <div className={cls(cl.block, className)}>
            <h3 className={cl.title}>{titleName}</h3>
            {isLoading ? (
                <LoadingLoop />
            ) : (
                <>{children}</>
            )}
        </div>
    );
};

export default ChartWrapper;