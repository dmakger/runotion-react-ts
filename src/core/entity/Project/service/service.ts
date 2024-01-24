import {getCurrentURL} from "core/entity/Path/service/service";
import {getImage} from "core/service/image";
import defaultProjectImagePNG from "core/static/img/default-project-image.png"

// ===={ URL }====
export const getProjectIdFromURL = () => {
    const url = getCurrentURL()
    const regex = /(?:\/project\/)?(\d+)/;
    const matches = url.match(regex);
    return matches && matches[1] ? parseInt(matches[1], 10) : null;
}


// ===={ IMAGE }====
// Получение дефолтного изображения проекта
export const getDefaultProjectImage = () => {
    return defaultProjectImagePNG
}

// Получение изображения проекта
export const getProjectImage = (image?: string | null) => {
    if (image === undefined || image === null)
        return getDefaultProjectImage()
    return getImage(image);
}