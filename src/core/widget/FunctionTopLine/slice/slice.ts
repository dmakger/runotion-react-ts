import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IFunctionTopLine, ISwapVisibleFunctionTopLine} from "core/widget/FunctionTopLine/model/model";
import {DATA_TOGGLE_SWITCH__FUNCTION_TOP_LINE} from "core/widget/FunctionTopLine/data/data";

const initialState: IFunctionTopLine[] = DATA_TOGGLE_SWITCH__FUNCTION_TOP_LINE

export const FunctionTopLineSlice = createSlice({
    name: 'functionTopLine',
    initialState,
    reducers: {
        setFunctionTopLine(_, action: PayloadAction<IFunctionTopLine[]>) {
            const data = action.payload;
            return [...data];
        },
        getFunctionTopLine(state) {
            return state;
        },
        swapVisibleByKey(state, action: PayloadAction<ISwapVisibleFunctionTopLine>) {
            const { key, isVisible } = action.payload;
            return state.map(it => (it.key === key ? { ...it, isVisible } : it));
        },
    }
})

export const FunctionTopLineReducer = FunctionTopLineSlice.reducer
