import React from 'react';
import cl from './_FunctionTopLine.module.scss'
import {cls} from "core/service/cls";
import {useAppSelector} from "core/storage/hooks";

interface FunctionTopLineProps {
    className?: string
}

const FunctionTopLine = ({ className = '' }: FunctionTopLineProps) => {
    const functionTopLine = useAppSelector(state => state.functionTopLine);

    return (
        <div className={cls(cl.list, className)}>
            {functionTopLine.map((it, index) => {
                if (it.isVisible) {
                    return <div key={index}>{it.element}</div>;
                }
                return null;
            })}
        </div>
    );
};

export default FunctionTopLine;