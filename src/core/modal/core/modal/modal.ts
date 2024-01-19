import React from "react";

export interface IModal {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}


export enum ETypeHintModal {
    ERROR,
    SUCCESS
}

export interface IHintModal {
    type: ETypeHintModal
    message: string
}