import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IItemLeftMenuRedux} from "core/entity/LeftMenu/model/model";

const initialState: IItemLeftMenuRedux = {
    image: "",
    title: "",
    to: "",
}

export const LeftMenuSlice = createSlice({
    name: 'leftMenu',
    initialState,
    reducers: {
        setLeftMenu(state, action: PayloadAction<IItemLeftMenuRedux>) {
            const data = action.payload

            state.to = data.to
            state.title = data.title
            state.image = data.image
        },
    }
})

export const LeftMenuReducer = LeftMenuSlice.reducer
