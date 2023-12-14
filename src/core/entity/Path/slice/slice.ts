import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TRoute, TRouteRedux } from "core/entity/Route/model/model";

const initialState: TRouteRedux[] = []

export const PathSlice = createSlice({
    name: 'path',
    initialState,
    reducers: {
        setPath(state, action: PayloadAction<TRoute[]>) {
            const data = action.payload
            state = [...data]
            return [...data]
        },

        push(state, action: PayloadAction<TRoute>) {
            const data = action.payload
            state.push(data)
        },

        pop(state) {
            state.pop()
        },

        moveIndex(state, action: PayloadAction<number>) {
            const index = action.payload
            if (index+1 <= state.length && index >= 0) {
                state.splice(0, index+1)
            } 
        },

        // setSmart(state, action: PayloadAction<TRoute>) {
        //     const data = action.payload
        //     state = [data, ...state]
        //     if (data.parent) {
        //         this.setSmart(state, data.parent)
        //     }
        // }

        // setPathByIndex(state, action: PayloadAction<PathToIndexRedux>) {
        //     const {path, index} = action.payload
        //     if (index+1 <= state.length && index >= 0) {
        //         state.splice(0, index+1)
        //         state[index] = path 
        //     } 
        // },
    }
})

export const PathReducer = PathSlice.reducer
