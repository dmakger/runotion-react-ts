import React from 'react';
import cl from './_GreenButton.module.scss'
import { cls } from 'core/service/cls';
import { ETypeButton } from '../../model/model';

interface GreenButtonProps {
    title: string
    type?: ETypeButton
    isLoading?: boolean
    titleLoading?: string
    onClick?: Function
    className?: string
}

const GreenButton = ({title, type=ETypeButton.SUBMIT, isLoading=false,  titleLoading, onClick = () => {}, className}: GreenButtonProps) => {
    return (
        <button onClick={() => onClick()} type={type} className={cls(cl.button, className)}>
            {isLoading ? (titleLoading) : (title)}
        </button>
    );
};

export default GreenButton;