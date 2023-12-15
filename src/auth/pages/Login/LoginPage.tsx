import React from 'react';
import {LOGIN__ROOT} from "auth/router/routes/routes";
import LoginForm from "core/forms/Login/ui/LoginForm";
import {useActionCreators} from "core/storage/hooks";

const LoginPage = () => {
    useActionCreators().setPath([LOGIN__ROOT])

    return (
        <LoginForm />
    );
};

export default LoginPage;