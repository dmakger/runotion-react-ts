import React, {useEffect} from 'react';
import MainRouter from "main/router/MainRouter";
import AuthRouter from "auth/router/AuthRouter";
import {getCurrentURL} from "core/entity/Path/service/service";
import {getUserData, refreshToken} from "core/entity/User/api/UserAPI";
import {useActionCreators} from "core/storage/hooks";
import {IAuthResponse, IUser} from "core/entity/User/model/model";
import {useNavigate} from "react-router-dom";
import {LOGIN__AUTH_URL} from "auth/router/urlRouter";
import {IDepartment} from "core/entity/Department/model/model";


const AppRouter = () => {

    // FUNC
    const currentURL = getCurrentURL()
    const actionCreators = useActionCreators()
    const navigate = useNavigate()

    // EFFECT
    useEffect(() => {
        refreshToken().then(r => {
            actionCreators.saveToken(r as IAuthResponse)
            getUserData().then(res => {
                const user = {...res} as IUser
                user.department = {name: res.department} as IDepartment
                actionCreators.setAuth(user);
            })
        }, () => {
            actionCreators.logout()
            navigate(LOGIN__AUTH_URL)
        })
    }, [actionCreators, navigate])



    const getRouterToRender = () => {
        if (currentURL.includes('auth')) {
            return <AuthRouter />;
        } else {
            return <MainRouter />;
        }
    };
    return getRouterToRender()

};

export default AppRouter;