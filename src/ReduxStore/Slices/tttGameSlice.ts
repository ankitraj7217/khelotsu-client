import { createSlice } from "@reduxjs/toolkit";

interface IPlayerSymbol {
    [key: string]: string;
}

interface ITTTGameSlice {
    board: Array<(number | string)>;
    startPlayer: string;
    playerSymbols: IPlayerSymbol;
}

const initialState: ITTTGameSlice = {
    board: Array(9).fill(-1),
    startPlayer: "",
    playerSymbols: {}
}

const tttGameSlice = createSlice({
    name: "ttt",
    initialState,
    reducers: {
        updateBoard: (state, action) => {
            const { modifiedIdx, symbol } = action.payload;
            state.board[modifiedIdx] = symbol;
        },

        clearBoard: (state, _) => {
            state.board = Array(9).fill(-1);
        },

        setStartPlayer: (state, action) => {
            state.startPlayer = action.payload;
        },

        setPlayerSymbols: (state, action) => {
            state.playerSymbols = action.payload;
        }
    }
})

export const { updateBoard, clearBoard, setStartPlayer, setPlayerSymbols} = tttGameSlice.actions;

export default tttGameSlice.reducer;