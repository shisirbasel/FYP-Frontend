import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoading : true
}

export const loadSlice = createSlice(
    {
        name : "load",
        initialState,
        reducers:{
            loadingTrue: (state) =>{
                isLoading: true
            },
            loadingFalse: (state) =>{
                isLoading: false
            }
        }

    }
)

export const {loadingFalse, loadingTrue} = loadSlice.actions

export default loadSlice.reducers