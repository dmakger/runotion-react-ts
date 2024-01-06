import React from 'react';
import loadingSVG from 'core/static/img/loading-loop-green.svg'
import cl from './_LoadingLoop.module.scss'
import {cls} from "core/service/cls";

interface LoadingLoopProps {
    className?: string
    classNameLoop?: string
}

const LoadingLoop = ({className, classNameLoop}: LoadingLoopProps) => {
    return (
        <div className={cls(cl.wrapper, className)}>
            <img src={loadingSVG}
                 alt="loading"
                 className={cls(cl.image, classNameLoop)} />
        </div>
    );
};

export default LoadingLoop;