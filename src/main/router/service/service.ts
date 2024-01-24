import {TRoute, TRouteArgs} from "core/entity/Route/model/model";


// Замена параметров у [TRoute]
export const swapArgsTRoute = (route: TRoute, obj: TRouteArgs) => {
    return {...route, ...obj} as TRoute
}


// Замена параметров у ссылики
export interface IArgsUrl {
    key: string
    value: string
}

export const swapArgUrl = (url: string, els:IArgsUrl[]): string => {
    let modifiedUrl = url;
    els.forEach(el => {
        const regex = new RegExp(`:${el.key}`, 'g')
        modifiedUrl = modifiedUrl.replace(regex, el.value)
    })
    return modifiedUrl
}