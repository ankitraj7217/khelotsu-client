import { createSlice } from "@reduxjs/toolkit";
import { ICustomChat } from "../../Utils/customInterfaces";

interface IChatSlice {
    chatData: ICustomChat[];
}

const initialState: IChatSlice = {
    chatData: []
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addChatToThread: (state, action) => {
            state.chatData = [...state.chatData, action.payload];
        }
    }
})

export const { addChatToThread } = chatSlice.actions;

export default chatSlice.reducer;