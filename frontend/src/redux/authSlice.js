import {createSlice} from "@reduxjs/toolkit"

const getStoredUser = () => {
    try {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const authSlice = createSlice({
    name : "auth",

    initialState : ({
        user : getStoredUser(),
        token : localStorage.getItem("token")
    }),

    reducers : {
        loginSuccess : (state, action)=>{
            state.user = action.payload.user
            state.token = action.payload.token

            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.user))
        },

        logout : (state)=>{
            state.user = null
            state.token = null

            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    },

})

export const {loginSuccess, logout} = authSlice.actions

export default authSlice.reducer