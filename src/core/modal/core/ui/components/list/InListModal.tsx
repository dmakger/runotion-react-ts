import React, {ReactNode} from 'react';
import cl from "./_InListModal.module.scss";
import Button from "core/components/Button/ui/parent/Button";
import {cls} from "core/service/cls";

interface InListModalProps {
    titleBack: string
    onClickBack: Function
    titleSuccess: string
    onClickSuccess: Function
    isLoadingSuccess?: boolean
    titleLoadingSuccess?: string
    description?: string
    children: ReactNode
    className?: string
}

const InListModal = ({titleBack, titleSuccess,
                         isLoadingSuccess, titleLoadingSuccess,
                         onClickBack, onClickSuccess,
                         description, children, className}: InListModalProps) => {

    return (
        <div className={cls(cl.wrapper, className)}>
            <div className={cl.content}>
                {description &&
                    <span className={cl.description}>{description}</span>
                }
                {children}
            </div>
            <div className={cl.buttons}>
                <Button.Green title={titleBack} onClick={onClickBack} className={cl.back} />
                <Button.Green title={titleSuccess} onClick={onClickSuccess}
                              isLoading={isLoadingSuccess} titleLoading={titleLoadingSuccess}/>
            </div>
        </div>
    );
};

export default InListModal;