import React from 'react';
import cl from 'core/components/Form/ui/Column/_ColumnForm.module.scss'
import {cls} from "core/service/cls";
import {FormProps} from "core/components/Form/model/model";

interface ColumnFormProps extends FormProps {}

const ColumnForm = ({className, formRef, onSubmit = () => {}, children, ...resp}: ColumnFormProps) => {
    return (
        <form onSubmit={e => onSubmit(e)} ref={formRef} className={cls(cl.form, className)} {...resp}>
            {children}
        </form>
    );
};

export default ColumnForm;