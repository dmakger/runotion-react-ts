import React, {ReactNode} from 'react';
import cl from './_H1.module.scss'
import {cls} from "core/service/cls";

interface H1Props {
    className?: string
    children?: ReactNode,
}

const H1 = ({className='', children, ...resp}: H1Props) => {
    return (
        <h1 className={cls(cl.title, className)} {...resp}>{children}</h1>
    );
};

export default H1;