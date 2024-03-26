import { createSlice } from "@reduxjs/toolkit";
import { initInitialPiecePos, setPos } from "../../Components/Games/Chess/chess.utils";

interface IPlayerSymbol {
    [key: string]: string;
}

interface IChessGameSlice {
    chessBoard: Array<Array<string>>;
    playerSymbols: IPlayerSymbol;
}

const initialState: IChessGameSlice = {
    chessBoard: initInitialPiecePos(),
    playerSymbols: {}
}

const chessGameSlice = createSlice({
    name: "chess",
    initialState,
    reducers: {
        updateChessBoard: (state, action) => {
            const { piece, moveIdx, currPiecePos } = action.payload;
            setPos(state.chessBoard, currPiecePos, "");
            setPos(state.chessBoard, moveIdx, piece);
        },

        updateChessBoardEntirely: (state, action) => {
            state.chessBoard = action.payload;
        },

        clearBoard: (state, _) => {
            state.chessBoard = initInitialPiecePos();
        },

        setPlayerSymbols: (state, action) => {
            state.playerSymbols = action.payload;
        }
    }
})

export const { updateChessBoard, updateChessBoardEntirely, clearBoard, setPlayerSymbols } = chessGameSlice.actions;
export default chessGameSlice.reducer;