import {getImage} from "core/service/image";
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