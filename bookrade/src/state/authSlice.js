import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogin:false,
}

export const AuthSlice = createSlice(
    {
        name:'auth',
        initialState,
        reducers: {
            loginSuccess: (state,action) => {
                state.isLogin = true;
              },
            loginFailure: (state) => {
                state.isLogin = false;
              },
            logout: (state) => {
                state.isLogin = false;
                localStorage.clear()
              },
        }
    }
)

export const {loginFailure, loginSuccess, logout} = AuthSlice.actions

export default AuthSlice.reducer