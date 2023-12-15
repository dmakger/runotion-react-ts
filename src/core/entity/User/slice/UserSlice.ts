import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthResponse, IUser} from "core/entity/User/model/model";


const initialState: IUser = {
    id: -1,
    name: '',
    username: '',
    image: '',
    department: undefined
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveToken(state, action: PayloadAction<IAuthResponse>) {
            const {access, refresh} = action.payload
            localStorage.setItem('accessToken', access);
            if (refresh !== undefined)
                localStorage.setItem('refreshToken', refresh);
        },
        setAuth(state, action: PayloadAction<IUser>) {
            const data = action.payload
            state = {...data}
            return state

        },
        logout(state){
            state = initialState;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    }
})

export const UserReducer = UserSlice.reducer;