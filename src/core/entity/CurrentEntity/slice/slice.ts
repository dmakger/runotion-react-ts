import {ECurrentEntity, ECurrentStateEntity, ICurrentEntity,} from "core/entity/CurrentEntity/model/model";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: ICurrentEntity = {
    state: ECurrentStateEntity.Not,
    entity: ECurrentEntity.Not,
    data: undefined
}

export const CurrentEntitySlice = createSlice({
    name: 'currentEntity',
    initialState,
    reducers: {
        setState(state, action: PayloadAction<ECurrentStateEntity>) {
            state.state = action.payload
        },

        setEntity(state, action: PayloadAction<ECurrentEntity>) {
            state.entity = action.payload
        },

        set(state, action: PayloadAction<ICurrentEntity>) {
            return action.payload
        },
    }
})

export const CurrentEntityReducer = CurrentEntitySlice.reducer

