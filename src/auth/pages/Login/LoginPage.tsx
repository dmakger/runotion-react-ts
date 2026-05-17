import React, {useEffect} from 'react';
import {LOGIN__ROOT} from "auth/router/routes/routes";
import LoginForm from "core/forms/Login/ui/LoginForm";
import {useActionCreators} from "core/storage/hooks";

const LoginPage = () => {
    const actionCreators = useActionCreators()

    useEffect(() => {
        actionCreators.setPath([LOGIN__ROOT])
    }, [actionCreators])

    return (
        <LoginForm />
    );
};

export default LoginPage;
