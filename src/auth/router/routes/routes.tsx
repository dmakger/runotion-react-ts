import {TRoute} from "core/entity/Route/model/model";
import {LOGIN__AUTH_URL} from "auth/router/urlRouter";
import LoginPage from "auth/pages/Login/LoginPage";

export const LOGIN__ROOT: TRoute = {
    key: 'login',
    route: {
        path: LOGIN__AUTH_URL,
        element: <LoginPage/>
    },
    title: 'Вход'
}

// DATA
export const authRoutes: TRoute[] = [
    LOGIN__ROOT
]