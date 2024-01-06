import React from 'react';
import cl from './_AddUser.module.scss'
import {cls} from "core/service/cls";

interface AddUserProps {
    text?: string
    onClick?: Function
    className?: string
}

const AddUser = ({text, onClick = () => {}, className}: AddUserProps) => {
    let _text = '+ Добавить'
    if (text)
        _text = text
    return (
        <button onClick={() => onClick()} className={cls(cl.block, className)}>
            {_text}
        </button>
    );
};

export default AddUser;