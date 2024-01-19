import React from 'react';
import cl from './_HintModal.module.scss'
import { cls } from 'core/service/cls';
import { IHintModal, ETypeHintModal } from 'core/modal/core/modal/modal';


interface HintModalProps {
    hint?: IHintModal
    isVisible?: boolean
    className?: string
}

const HintModal = ({hint, isVisible=true, className}: HintModalProps) => {
    if (!isVisible || !hint)
        return <></>
    
    return (
        <div className={cls(cl.block, hint.type === ETypeHintModal.ERROR ? cl.error : cl.success, className)}>
            <span className={cl.text}>{hint.message}</span>
        </div>
    );
};

export default HintModal;