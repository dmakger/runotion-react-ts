import {TRoute} from "core/entity/Route/model/model";

export const getLinkPath = (path: TRoute) => {
    return path.route.path ?? '#'
}


// URL
export const getCurrentURL = () => {
    return window.location.pathname
}

export const isCurrentURL = (url: string | undefined) => {
    if (!url) return false

    let _url = url;
    if (!_url.startsWith('/'))
        _url = '/' + _url
    return getCurrentURL() === _url
}