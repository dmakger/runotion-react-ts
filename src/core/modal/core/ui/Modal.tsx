import React, {ReactNode, useRef} from 'react';
import cl from 'core/modal/core/ui/_Modal.module.scss'
import {cls} from "core/service/cls";
import {IModal} from "core/modal/core/modal/modal";

interface ModalProps extends IModal {
    classNameModal?: string;
    className?: string;
    children: ReactNode;
}

const Modal = ({ isVisible , setIsVisible, classNameModal, className, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleContentClick = () => {
        setIsVisible(!isVisible)
    };

    return (
        <div ref={modalRef} onClick={handleContentClick} className={cls(cl.modal, isVisible ? cl.visible : '', classNameModal)}>
            <div onClick={e => e.stopPropagation()} className={cls(cl.content, className)}>
                {children}
            </div>
        </div>
    );
};

export default Modal;