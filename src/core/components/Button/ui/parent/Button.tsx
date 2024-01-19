import React, {ReactNode} from 'react';
import LargeButton from "core/components/Button/ui/Large/LargeButton";
import GreenButton from '../Green/GreenButton';

interface ButtonProps {
    children?: ReactNode
}

const Button = ({children}: ButtonProps) => {
    return (
        <>
            {children}
        </>
    );
};

Button.Large = LargeButton
Button.Green = GreenButton

export default Button;