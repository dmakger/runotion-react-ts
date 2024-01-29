import React from 'react';
import cl from './_Logout.module.scss'
import {cls} from "core/service/cls";
import {LOGIN__AUTH_URL} from "auth/router/urlRouter";
import {useActionCreators} from "core/storage/hooks";
import {useNavigate} from "react-router-dom";

interface LogoutProps {
    className?: string
}

const Logout = ({className}: LogoutProps) => {
    const navigate = useNavigate()
    const actionCreators = useActionCreators()

    const handleOnClick = () => {
        actionCreators.logout()
        navigate(LOGIN__AUTH_URL)
    }

    return (
        <button onClick={handleOnClick} className={cls(cl.block, className)}>
            Выйти
        </button>
    );
};

export default Logout;