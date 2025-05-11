import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState:{
        isLoggedIn:false,
        currentUser:null,
        error:null,
        loading:false,
        session:null,
    },
    reducers:{
        loginRequest:(state)=>{
            state.loading = true;
            state.error = null;
        },
        loginSuccess:(state,action)=>{
            state.loading = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            state.error = null;
        },
        loginFailure:(state,action)=>{
            state.loading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = action.payload;
        },
        logout:(state)=>{
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        registerRequest:(state)=>{
            state.loading = true;
            state.error = null
        },
        registerSuccess:(state, action)=>{
            state.loading = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            state.error = null;
        },
        registerFailure(state,action){
            state.loading = false;
            state.isLoggedIn = false;
            state.currentUser = null;
            state.error = action.payload;
        }
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout, registerRequest, registerSuccess, registerFailure } = userSlice.actions;
export default userSlice.reducer;