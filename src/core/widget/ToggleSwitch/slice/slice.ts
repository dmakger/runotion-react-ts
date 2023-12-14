import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IToggleSwitch} from "core/widget/ToggleSwitch/model/model";

const initialState: IToggleSwitch[] = []

export const ToggleSwitchSlice = createSlice({
    name: 'toggleSwitch',
    initialState,
    reducers: {
        setToggleList(state, action: PayloadAction<IToggleSwitch[]>) {
            const data = action.payload
            state = [...data]
            return [...data]
        },
        setActive(state, action: PayloadAction<IToggleSwitch['to']>) {
            const to = action.payload;
            return state.map(it => (it.to === to ? {...it, isActive: true} : {...it, isActive: false}));
        },
    }
})

export const ToggleSwitchReducer = ToggleSwitchSlice.reducer
