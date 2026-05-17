import React, {FormEvent, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {LOGIN__AUTH_URL} from "auth/router/urlRouter";
import {useActionCreators} from "core/storage/hooks";
import Input from "core/components/Input/ui/Input";
import Button from "core/components/Button/ui/parent/Button";
import {ETypeInput} from "core/components/Input/model/model";
import {createRegistrationRequestAPI} from "core/entity/User/api/UserAPI";
import cl from './_RegistrationRequestPage.module.scss'

type TRequestMode = 'mts' | 'credentials'

const RegistrationRequestPage = () => {
    const [mode, setMode] = useState<TRequestMode>('mts')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const actionCreators = useActionCreators()

    useEffect(() => {
        actionCreators.setPath([{
            key: 'registrationRequest',
            route: {path: '/auth/registration-request/'},
            title: 'Запрос доступа',
        }])
    }, [actionCreators])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const body = {
            full_name: String(form.get('full_name') || ''),
            mts_login: mode === 'mts' ? String(form.get('mts_login') || '') : '',
            username: mode === 'credentials' ? String(form.get('username') || '') : '',
            password: mode === 'credentials' ? String(form.get('password') || '') : '',
            comment: String(form.get('comment') || ''),
        }

        setIsLoading(true)
        setError('')
        setMessage('')
        createRegistrationRequestAPI(body)
            .then(() => setMessage('Заявка отправлена. После подтверждения можно будет войти.'))
            .catch(() => setError('Не удалось отправить заявку. Проверьте данные и попробуйте еще раз.'))
            .finally(() => setIsLoading(false))
    }

    return (
        <form className={cl.form} onSubmit={handleSubmit}>
            <div className={cl.switcher}>
                <button type="button"
                        className={mode === 'mts' ? cl.active : ''}
                        onClick={() => setMode('mts')}>
                    Логин МТС
                </button>
                <button type="button"
                        className={mode === 'credentials' ? cl.active : ''}
                        onClick={() => setMode('credentials')}>
                    Учётные данные
                </button>
            </div>

            <Input.Text name={'full_name'} placeholder={'ФИО'} required/>

            {mode === 'mts' ? (
                <Input.Text name={'mts_login'} placeholder={'Логин МТС'} required/>
            ) : (
                <>
                    <Input.Text name={'username'} placeholder={'Логин'} required/>
                    <Input.Text name={'password'} type={ETypeInput.PASSWORD} placeholder={'Пароль'} required/>
                </>
            )}

            <textarea name="comment" className={cl.comment} placeholder="Комментарий"/>

            <Button.Large title={isLoading ? 'Отправка...' : 'Отправить заявку'}/>
            <Link to={`/${LOGIN__AUTH_URL}`} className={cl.back}>Вернуться ко входу</Link>

            {error && <p className={cl.error}>{error}</p>}
            {message && <p className={cl.success}>{message}</p>}
        </form>
    );
};

export default RegistrationRequestPage;
