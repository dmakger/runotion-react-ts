import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {LeftMenuReducer} from "core/entity/LeftMenu/slice/slice";
import { PathReducer } from "core/entity/Path/slice/slice";
import {ToggleSwitchReducer} from "core/widget/ToggleSwitch/slice/slice";
import {FunctionTopLineReducer} from "core/widget/FunctionTopLine/slice/slice";
import {UserReducer} from "core/entity/User/slice/UserSlice";

const rootReducer = combineReducers({
    leftMenu: LeftMenuReducer,
    path: PathReducer,
    functionTopLine: FunctionTopLineReducer,
    toggleSwitch: ToggleSwitchReducer,

    user: UserReducer,
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