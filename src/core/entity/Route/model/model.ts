import { RouteProps } from "react-router-dom"

export type TRoute = {
    key: string
    route: RouteProps
    title?: string
    parent?: TRoute
}

// REDUX
export type TRouteRedux = TRoute;