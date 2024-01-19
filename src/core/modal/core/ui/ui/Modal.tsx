import React, {ReactNode, useRef} from 'react';
import cl from './_Modal.module.scss'
import {cls} from "core/service/cls";
import {IHintModal, IModal} from "core/modal/core/modal/modal";
import HintModal from '../components/hint/ui/HintModal';

interface ModalProps extends IModal {
    title?: string
    hint?: IHintModal
    classNameModal?: string;
    className?: string;
    children: ReactNode;
}

const Modal = ({ title, hint, isVisible , setIsVisible, classNameModal, className, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleContentClick = () => {
        setIsVisible(!isVisible)
    };

    return (
        <div ref={modalRef} onClick={handleContentClick} className={cls(cl.modal, isVisible ? cl.visible : '', classNameModal)}>
            <div onClick={e => e.stopPropagation()} className={cls(cl.content, className)}>
                <HintModal isVisible={hint !== undefined} hint={hint} className={cl.hint} />
                {title &&
                    <h2 className={cl.title}>{title}</h2>
                }
                {children}
            </div>
        </div>
    );
};

export default Modal;