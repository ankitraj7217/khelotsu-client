import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        userName: ""
    },
    reducers: {
        addAndUpdateUser: (state, action) => {
            state.userName = action.payload;
        },
        removeUser: (state) => {
            state.userName = "";
        }
    }
})

export const { addAndUpdateUser, removeUser } = loginSlice.actions;

export default loginSlice.reducer;