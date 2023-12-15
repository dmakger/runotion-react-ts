import {ReactNode} from "react";

export enum ETypeButton {
    SUBMIT = "submit",
    BUTTON = "button",
}

export interface IButton {
    title?: string
    type?: ETypeButton

    className?: string
    onClick?: Function
    children?: ReactNode
}