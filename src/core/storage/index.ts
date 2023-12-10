import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {LeftMenuReducer} from "core/entity/LeftMenu/slice/slice";
import { PathReducer } from "core/entity/Path/slice/slice";

const rootReducer = combineReducers({
    leftMenu: LeftMenuReducer,
    path: PathReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(

            ),
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']