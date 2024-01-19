import React, { useRef, useState } from 'react';
import cl from './_CreateProjectModal.module.scss';
import { IHintModal, IModal } from 'core/modal/core/modal/modal';
import { getErrorHintModal, getSuccessHintModal } from 'core/modal/core/ui/components/hint/service/service';
import { createProjectAPI } from 'core/entity/Project/api/ProjectApi';
import Modal from 'core/modal/core/ui/ui/Modal';
import { cls } from 'core/service/cls';
import Button from 'core/components/Button/ui/parent/Button';
import Input from 'core/components/Input/ui/Input';
import Form from 'core/components/Form/ui/parent/Form';
import { ETypeButton } from 'core/components/Button/model/model';
import { getFormData } from 'core/components/Form/service/service';
import { FormProps } from 'core/components/Form/model/model';

interface CreateProjectModalProps extends IModal {
    onClick?: Function
    isLoadingRequest?: boolean
    setIsLoadingRequest?: Function
    className?: string
}


const CreateProjectModal = ({onClick = () => {}, isLoadingRequest, setIsLoadingRequest = () => {}, isVisible = false, setIsVisible, className}: CreateProjectModalProps) => {
    // STATE
    const [hintModal, setHintModal] = useState<IHintModal>()

    // REF
    const formRef = useRef(null)

    // CREATE PROJECT
    const handleOnSubmit: FormProps["onSubmit"] = (e) => {
        const formData = getFormData(e, formRef)
        if (formData === undefined) return
        
        setIsLoadingRequest(true)
        createProjectAPI(formData)
            .then(r => {
                console.log(r)
                onClick(r)
                setHintModal(getSuccessHintModal('Проект успешно создан!'))
            })
            .catch(e => {
                console.log(e)
                let text = 'Ошибка сервера'
                if (e.status === 400)
                    text = "Такой код уже существует"
                setHintModal(getErrorHintModal(text))
            })
            .finally(() => (
                setIsLoadingRequest(false)
            ))
    }

    // НАЖАТИЕ НА КНОПКУ "Назад"
    const handleOnClickBack = () => {
        setIsVisible(false)
    }

    return (
        <Modal title={'Создание проекта'} hint={hintModal}
               isVisible={isVisible} setIsVisible={setIsVisible} 
               className={cls(cl.block, className)}
        >
            <Form.Column onSubmit={handleOnSubmit} formRef={formRef} className={cl.wrapper}>
                <div className={cl.form}>
                    <Input.Text placeholder='Название проекта' name={'name'} required={true} className={cl.input}/>
                    <Input.Text placeholder='Код проекта' name={'code'} required={true} className={cl.input}/>
                </div>
                <div className={cl.buttons}>
                    <Button.Green title={"Назад"} type={ETypeButton.BUTTON} onClick={handleOnClickBack} className={cl.back} />
                    <Button.Green title={"Создать"}
                                  isLoading={isLoadingRequest} titleLoading={"Создание..."} />
                </div>
            </Form.Column>
        </Modal>
    );
};

export default CreateProjectModal;