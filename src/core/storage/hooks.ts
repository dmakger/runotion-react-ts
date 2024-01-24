import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "redux";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {AppDispatch, RootState} from "core/storage/index";
import {PathSlice} from "core/entity/Path/slice/slice";
import {ToggleSwitchSlice} from "core/widget/ToggleSwitch/slice/slice";
import {FunctionTopLineSlice} from "core/widget/FunctionTopLine/slice/slice";
import {UserSlice} from "core/entity/User/slice/UserSlice";
import {CurrentEntitySlice} from "core/entity/CurrentEntity/slice/slice";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//Сюда кидаем акшены с нового слайса
export const useActionCreators = () => {
    const dispatch = useAppDispatch()

    const actions = useMemo(
        () => ({
            ...LeftMenuSlice.actions,
            ...CurrentEntitySlice.actions,
            ...PathSlice.actions,
            ...FunctionTopLineSlice.actions,
            ...ToggleSwitchSlice.actions,
            ...UserSlice.actions,
        }),
        [],
    )

    return useMemo(
        () => bindActionCreators(actions, dispatch),
        [actions, dispatch],
    )
}