import React from "react";

export interface IModal {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}