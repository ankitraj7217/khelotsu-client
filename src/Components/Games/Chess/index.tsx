import React, { FC, useEffect, useState } from "react";
import {
  chessRanks,
  chessFiles,
  initInitialPiecePos,
  setPos,
  getValidPos,
  removeReachDot,
  isPieceOnPos,
  getPieceType,
} from "./chess.utils";

import "./Chess.scss";
import { IGame } from "../../../Utils/customInterfaces";
import {
  getInitialChessSymbol,
  receiveChessPos,
  requestInitialChessSymbol,
  sendChessPos,
  socketGenericCheck,
} from "../../../Utils/socketUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBoard,
  setPlayerSymbols,
  updateChessBoard,
  updateChessBoardEntirely,
} from "../../../ReduxStore/Slices/chessGameSlice";
import { RootState } from "../../../ReduxStore/appStore";
import CustomModal from "../../CustomModal";
import CustomButton from "../../CustomButton";

const Chess: FC<IGame> = ({ socket, setErrorMsg, personsAllowedInRoom }) => {
  const [isNewGameStarted, setIsNewGameStarted] = useState(false);
  const [startGameMsg, setStartGameMsg] = useState("");
  const [gameFinishedMsg, setGameFinishedMsg] = useState("");

  const { chessBoard, playerSymbols } = useSelector(
    (state: RootState) => state.chessGame
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    getInitialChessSymbol(socket, (receivedMsg: string) => {
      try {
        const { playerSymbols } = socketGenericCheck(receivedMsg);
        dispatch(setPlayerSymbols(playerSymbols));
        let playerMsg = "";
        Object.keys(playerSymbols).forEach(
          (key) => (playerMsg += `${key} got ${playerSymbols[key]}. `)
        );
        setGameFinishedMsg("");
        setStartGameMsg(playerMsg);
        dispatch(clearBoard(null));
        setIsNewGameStarted(true);
      } catch (err: any) {
        setErrorMsg(err?.message);
      }
    });

    receiveChessPos(socket, (receivedMsg: string) => {
      try {
        const data = socketGenericCheck(receivedMsg);

        const { piece, moveIdx, currPiecePos, winner } = data;
        dispatch(
          updateChessBoard({
            piece,
            moveIdx,
            currPiecePos,
          })
        );

        winner && setGameFinishedMsg(winner);
      } catch (err: any) {
        console.log(err?.message);
        // setErrorMsg(err?.message);
      }
    });
  }, []);

  useEffect(() => {
    if (isNewGameStarted) {
    }
  }, [playerSymbols]);

  const _startGame = () => {
    try {
      if (!socket) throw new Error("Socket not yet avaiable.");
      requestInitialChessSymbol(socket, JSON.stringify(personsAllowedInRoom));
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  const _onCloseModalStartGameCallback = () => {
    setStartGameMsg("");
  };

  const _onCloseModalFinishGameCallback = () => {
    dispatch(clearBoard(""));
    setGameFinishedMsg("");
  };

  const _onDragStart = (e: any) => {
    //TODO: implement restricting dragging out of board
    //TODO: ensure only bg image gets dragged, not square
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify(Array.from(e.target.classList))
    );
  };

  const _onDrop = (e: any) => {
    // TODO: make it more generic
    // TODO: instead of assuming classList is at last, make it generic
    const incomingList = JSON.parse(e.dataTransfer.getData("text"));
    const incomingPos = incomingList[incomingList.length - 1];
    const incomingPiece = incomingList[incomingList.length - 2];
    const currentList: Array<string> = Array.from(e.target.classList);
    const currentPos: string = currentList[currentList.length - 1];

    // const pieceType = getPieceType(incomingPiece);
    // if (pieceType !== whoseTurn) return;

    try {
      if (!socket) throw new Error("Socket not yet avaiable.");
      sendChessPos(
        socket,
        JSON.stringify({
          piece: incomingPiece,
          currPiecePos: incomingPos,
          moveIdx: currentPos,
        })
      );
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  const _onDragOver = (e: any) => {
    e.preventDefault();
  };

  const _onMouseOver = (e: any) => {
    let arr2d = chessBoard.map((row) => [...row]);
    const currClassList: Array<String> = Array.from(e.target.classList);
    const currIdx = currClassList[currClassList.length - 1];
    const pieceType: String = currClassList[currClassList.length - 2];

    const validPos = getValidPos(arr2d, pieceType, currIdx);
    const removeArr2d = removeReachDot(arr2d);
    dispatch(updateChessBoardEntirely(removeArr2d));

    validPos &&
      validPos.length &&
      validPos.forEach((pos) => {
        const [row, col] = pos.split("").map(Number);
        if (isPieceOnPos(arr2d, row, col)) {
        } // Don't replace already placed piece
        else if (arr2d[row][col] === ".") arr2d[row][col] = "";
        else arr2d[row][col] = "."; // if "" is there
      });

    // so that time to remove when mouse leave
    dispatch(updateChessBoardEntirely(arr2d));
  };

  const _onMouseLeave = (e: any) => {
    const arr2d = chessBoard.map((row) => [...row]);
    const removedArr2d = removeReachDot(arr2d);
    dispatch(updateChessBoardEntirely(removedArr2d));
  };

  return (
    <section className="chess">
      <div className="chess-game">
        <div className="chess-game-ranks">
          {chessRanks.map((ele) => (
            <div key={9 - ele} className="chess-game-ranks-rank">
              {9 - ele}
            </div>
          ))}
        </div>
        <div
          className="chess-game-board"
          onDrop={_onDrop}
          onDragOver={_onDragOver}
          onMouseOver={_onMouseOver}
          onMouseLeave={_onMouseLeave}
        >
          {chessRanks.flatMap((rank, idx1) =>
            chessFiles.map((file, idx2) => {
              const bgColorClassName =
                (idx1 + idx2) % 2 === 0
                  ? "chess-game-col-l"
                  : "chess-game-col-d";
              const pieceName = chessBoard[idx1][idx2];
              const posVal = `${idx1}${idx2}`;
              return (
                <div
                  key={`${9 - rank}${file}`}
                  draggable
                  className={`chess-game-board-block ${bgColorClassName} 
                                                piece ${
                                                  pieceName === "" ||
                                                  pieceName === "."
                                                    ? pieceName === ""
                                                      ? "empty"
                                                      : "empty reach"
                                                    : `occupied ${pieceName}`
                                                } ${posVal}`}
                  onDragStart={_onDragStart}
                ></div>
              );
            })
          )}
        </div>
        <div className="chess-game-files">
          {chessFiles.map((ele) => (
            <div key={ele} className="chess-game-files-file">
              {ele}
            </div>
          ))}
        </div>
      </div>
      <div className="chess-start">
        <div className="chess-start-btn">
          <CustomButton txt="Start" onClick={_startGame} />
        </div>
      </div>
      {startGameMsg && startGameMsg.length && (
        <CustomModal
          headerName={startGameMsg}
          isOpen={!!startGameMsg.length}
          closeModal={_onCloseModalStartGameCallback}
          isInputNeeded={false}
          customStyle={{ width: "15rem", height: "4rem", fontSize: "0.5rem" }}
        />
      )}
      {gameFinishedMsg && gameFinishedMsg && (
        <CustomModal
          headerName={gameFinishedMsg}
          isOpen={!!gameFinishedMsg.length}
          closeModal={_onCloseModalFinishGameCallback}
          isInputNeeded={false}
          customStyle={{ width: "15rem", height: "4rem" }}
        />
      )}
    </section>
  );
};

export default Chess;
