import React from 'react';
import {cls} from "core/service/cls";
import cl from './_InputText.module.scss'
import {ETypeInput, IInput} from "core/components/Input/model/model";


const InputText = ({name, type=ETypeInput.TEXT, placeholder, required=false, className}: IInput) => {
    return (
        <input name={name}
               type={type}
               placeholder={placeholder} required={required}
               className={cls(cl.input, className)}/>
    );
};

export default InputText;