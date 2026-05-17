import {TRoute} from "core/entity/Route/model/model";
import {LOGIN__AUTH_URL, REGISTRATION_REQUEST__AUTH_URL} from "auth/router/urlRouter";
import LoginPage from "auth/pages/Login/LoginPage";
import RegistrationRequestPage from "auth/pages/RegistrationRequest/RegistrationRequestPage";

export const LOGIN__ROOT: TRoute = {
    key: 'login',
    route: {
        path: LOGIN__AUTH_URL,
        element: <LoginPage/>
    },
    title: 'Вход'
}

export const REGISTRATION_REQUEST__ROOT: TRoute = {
    key: 'registrationRequest',
    route: {
        path: REGISTRATION_REQUEST__AUTH_URL,
        element: <RegistrationRequestPage/>
    },
    title: 'Запрос доступа'
}

// DATA
export const authRoutes: TRoute[] = [
    LOGIN__ROOT,
    REGISTRATION_REQUEST__ROOT
]
