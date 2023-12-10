import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "redux";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {AppDispatch, RootState} from "core/storage/index";
import { PathSlice } from "core/entity/Path/slice/slice";


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//Сюда кидаем акшены с нового слайса
export const useActionCreators = () => {
    const dispatch = useAppDispatch()

    const actions = useMemo(
        () => ({
            ...LeftMenuSlice.actions,
            ...PathSlice.actions,
        }),
        [],
    )

    return useMemo(
        () => bindActionCreators(actions, dispatch),
        [actions, dispatch],
    )
}