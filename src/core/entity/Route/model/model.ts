import { RouteProps } from "react-router-dom"

export type TRoute = {
    key: string
    route: RouteProps
    title?: string
    titlePath?: string
    parent?: TRoute
}

export type TRouteArgs = {
    key?: string
    route?: RouteProps
    title?: string
    titlePath?: string
    parent?: TRoute
}

// REDUX
export type TRouteRedux = TRoute;