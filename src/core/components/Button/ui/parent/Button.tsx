import React, {ReactNode} from 'react';
import LargeButton from "core/components/Button/ui/Large/LargeButton";

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

export default Button;