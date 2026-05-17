import {TRoute} from "core/entity/Route/model/model";
import {USER_PROFILE__MAIN_URL} from "main/router/urlRouter";
import UserProfilePage from "main/pages/User/UserProfilePage";

export const USER_PROFILE__ROOT: TRoute = {
    key: 'userProfile',
    route: {
        path: USER_PROFILE__MAIN_URL,
        element: <UserProfilePage/>
    },
    title: 'Профиль',
    titlePath: 'Профиль',
}
