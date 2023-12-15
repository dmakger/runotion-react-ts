import React, {ReactNode} from 'react';
import ColumnForm from "core/components/Form/ui/Column/ColumnForm";

interface FormProps {
    children: ReactNode
}

const Form = ({children}: FormProps) => {
    return (
        <>
            {children}
        </>
    );
};

Form.Column = ColumnForm

export default Form;