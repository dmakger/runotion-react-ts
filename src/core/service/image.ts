import {CURRENT_URL, GLOBAL_URL, IS_PROD, LOCAL_URL} from "core/api/mainAPI";

export const getImage = (url: string | undefined) => {
    if (!url || url.startsWith('http'))
        return url
    return CURRENT_URL + url
}

export const getImageSources = (url?: string | null) => {
    if (!url) return []
    if (url.startsWith('http')) return [url]

    const preferredSources = IS_PROD ? [GLOBAL_URL, LOCAL_URL] : [GLOBAL_URL, LOCAL_URL]
    return preferredSources.map(source => `${source}${url}`)
}
