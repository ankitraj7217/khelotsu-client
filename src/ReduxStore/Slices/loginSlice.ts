import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        userName: "",
        userId: "",
        email: ""
    },
    reducers: {
        addAndUpdateUser: (state, action) => {
            const { userName, userId, email } = action.payload;
            state.userName = userName;
            state.userId = userId;
            state.email = email;
        },
        removeUser: (state) => {
            state.userName = "";
            state.userId = "";
            state.email = "";
        }
    }
})

export const { addAndUpdateUser, removeUser } = loginSlice.actions;

export default loginSlice.reducer;