import {getImage} from "core/service/image";
import {IUser} from "core/entity/User/model/model";
import defaultUserImagePNG from "core/static/img/default-user-image.png"


// Получение дефолтного изображения пользователя
export const getDefaultUserImage = () => {
    return defaultUserImagePNG
}


// Получение изображение пользователя
export const getUserImage = (image?: string) => {
    if (image === undefined)
        return getDefaultUserImage()
    return getImage(image);
}

export const getUserDisplayName = (user: IUser) => {
    return user.name || user.username || `ID ${user.id}`
}

export const getUserDepartmentName = (user: IUser) => {
    if (!user.department) return undefined
    return typeof user.department === 'string' ? user.department : user.department.name
}
