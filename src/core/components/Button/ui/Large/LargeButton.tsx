import React from 'react';
import {ETypeButton, IButton} from "core/components/Button/model/model";
import {cls} from "core/service/cls";
import cl from './_LargeButton.module.scss'

const LargeButton = ({title, type=ETypeButton.SUBMIT, className, onClick = () => {}, children}: IButton) => {
    return (
        <button type={type} onClick={e => onClick(e)} className={cls(cl.button, className)}>
            {title ? title : children}
        </button>
    );
};

export default LargeButton;