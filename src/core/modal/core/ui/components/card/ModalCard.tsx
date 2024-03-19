import React from 'react';
import cl from './_ModalCard.module.scss'
import {cls} from "core/service/cls";

interface ModalCardProps {
    title: string
    onClick: Function
    className?: string
}

const ModalCard = ({title, onClick, className}: ModalCardProps) => {
    return (
        <button onClick={() => onClick()} className={cls(cl.card, className)}>
            <span className={cl.text}>{title}</span>
        </button>
    );
};

export default ModalCard;