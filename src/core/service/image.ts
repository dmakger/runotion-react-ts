import {CURRENT_URL} from "core/api/mainAPI";

export const getImage = (url: string | undefined) => {
    if (!url || url.startsWith('http'))
        return url
    return CURRENT_URL + url
}