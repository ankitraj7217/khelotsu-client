import React, { FC, useEffect, useState } from "react";
import CustomModal from "../../CustomModal";

import "./TicTacToe.scss";
import {
  getInitialTTTSymbol,
  receiveTTTPos,
  requestInitialTTTSymbol,
  sendTTTPos,
  socketGenericCheck,
} from "../../../Utils/socketUtils";
import { IGame } from "../../../Utils/customInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/appStore";
import {
  clearBoard,
  setPlayerSymbols,
  setStartPlayer,
  updateBoard,
} from "../../../ReduxStore/Slices/tttGameSlice";
import CustomButton from "../../CustomButton";

const TicTacToe: FC<IGame> = ({
  socket,
  setErrorMsg,
  personsAllowedInRoom,
}) => {
  const [gameFinishedMsg, setGameFinishedMsg] = useState("");
  const [isNewGameStarted, setIsNewGameStarted] = useState(false);
  const [startGameMsg, setStartGameMsg] = useState("");
  const { board, startPlayer, playerSymbols } = useSelector(
    (store: RootState) => store.tttGame
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;
    getInitialTTTSymbol(socket, (receivedMsg: string) => {
      try {
        const { currentPlayer, playerSymbols } =
          socketGenericCheck(receivedMsg);
        dispatch(setStartPlayer(currentPlayer));
        dispatch(setPlayerSymbols(playerSymbols));
        setIsNewGameStarted(true);
      } catch (err: any) {
        setErrorMsg(err?.message);
      }
    });

    receiveTTTPos(socket, (receivedMsg: string) => {
      try {
        const data = socketGenericCheck(receivedMsg);

        const { moveIdx, symbol, winner } = data;
        dispatch(
          updateBoard({
            modifiedIdx: moveIdx,
            symbol,
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
      let playerMsg = "";
      Object.keys(playerSymbols).forEach(
        (key) => (playerMsg += `${key} got ${playerSymbols[key]}. `)
      );
      startPlayer && (playerMsg += `${startPlayer} will start the game`);

      setGameFinishedMsg("");
      setStartGameMsg(playerMsg);
      dispatch(clearBoard(null));
    }
  }, [startPlayer, playerSymbols]);

  const _startGame = () => {
    try {
      if (!socket) throw new Error("Socket not yet avaiable.");
      requestInitialTTTSymbol(socket, JSON.stringify(personsAllowedInRoom));
    } catch (err: any) {
      setErrorMsg(err?.message);
    }
  };

  const _positionClicked = (idx: number) => {
    try {
      if (!socket) throw new Error("Socket not yet avaiable.");
      sendTTTPos(socket, JSON.stringify(idx));
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

  return (
    <section className="khelotsu-tictactoe">
      <div className="khelotsu-tictactoe-game">
        {board.map((ele, idx) => (
          <div
            className="khelotsu-tictactoe-game-square"
            aria-label="tic tac toe square"
            key={idx}
            onClick={() => _positionClicked(idx)}
          >
            <span>{ele === -1 ? "" : ele}</span>
          </div>
        ))}
      </div>
      <div className="khelotsu-tictactoe-start">
        <div className="khelotsu-tictactoe-start-btn">
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

export default TicTacToe;
