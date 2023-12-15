import React, {FormEvent, ReactNode} from "react";

export interface FormProps {
    className?: string
    formRef?: React.MutableRefObject<null>
    onSubmit?: (e: FormEvent) => void;
    children?: ReactNode
}