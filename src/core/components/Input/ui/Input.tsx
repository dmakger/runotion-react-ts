import React, {ReactNode} from 'react';
import InputText from "core/components/Input/Text/InputText";

interface InputProps {
    children: ReactNode
}

const Input = ({children}: InputProps) => {
    return (
        <>
            {children}
        </>
    );
};

Input.Text = InputText

export default Input;