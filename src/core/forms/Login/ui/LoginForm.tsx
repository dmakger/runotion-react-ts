import React, {useRef, useState} from 'react';
import cl from 'core/forms/Login/ui/_LoginForm.module.scss'
import Form from "core/components/Form/ui/parent/Form";
import Input from "core/components/Input/ui/Input";
import {FormProps} from "core/components/Form/model/model";
import Button from "core/components/Button/ui/parent/Button";
import {ETypeInput} from "core/components/Input/model/model";
import {getFormData} from "core/components/Form/service/service";
import {getUserData, login} from "core/entity/User/api/UserAPI";
import {cls} from "core/service/cls";
import {useNavigate} from "react-router-dom";
import {TASK__MAIN_URL} from "main/router/urlRouter";
import {useActionCreators} from "core/storage/hooks";
import {IDepartment} from "core/entity/Department/model/model";
import {IUser} from "core/entity/User/model/model";

interface LoginFormProps {
    className?: string
}

const LoginForm = ({className, ...resp}: LoginFormProps) => {
    // STATE
    const [success, setSuccess] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()

    // REF
    const formRef = useRef(null)

    // UTILS
    const navigate = useNavigate()
    const actionCreators = useActionCreators()


    const handleOnSubmit: FormProps["onSubmit"] = (e) => {
        const formData = getFormData(e, formRef)
        if (formData === undefined) return

        login({body: formData}).then(r => {
            actionCreators.saveToken(r)
            getUserData().then(res => {
                const user = {...res} as IUser
                user.department = {name: res.department} as IDepartment
                actionCreators.setAuth(user);
            })
            
            setError(undefined)
            setSuccess('Успешный вход!')
            navigate(TASK__MAIN_URL)
        }, () => {            
            setSuccess(undefined)
            setError('Неправильный логин или пароль')
        })
    }

    return (
        <>
            <Form.Column className={className} onSubmit={handleOnSubmit} formRef={formRef} {...resp}>
                <Input.Text type={ETypeInput.TEXT}
                            name={'username'}
                            placeholder={'Username'}/>
                <Input.Text type={ETypeInput.PASSWORD}
                            name={'password'}
                            placeholder={'Password'}/>
                <Button.Large className={cl.button} title={'Войти'}/>
            </Form.Column>

            {error && <p className={cls(cl.error, cl.message)}>{error}</p>}
            {success && <p className={cls(cl.success, cl.message)}>{success}</p>}
        </>
    );
};

export default LoginForm;