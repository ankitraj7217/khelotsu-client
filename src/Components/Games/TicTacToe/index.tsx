import React, { useEffect, useState } from "react";
import { drawMsg, winningPositions } from "./tictactoe.constants";
import useTranslation from "../../../Utils/useTranslation";
import CustomModal from "../../CustomModal";

import "./TicTacToe.scss";

const TicTacToe = () => {
	const [squareVals, setSquareVals] = useState<number[]>(Array(9).fill(-1)); // can be just -1(for empty), 0 (for O), 1 (for X)
	const [isTurn, setIsTurn] = useState(false); // false -> X, true -> O
	const [gameFinishedandMsg, setGameFinishedandMsg] = useState("");
	const t = useTranslation();

	const _isWinner = (arr: number[]) => {
		for (let i = 0; i < winningPositions.length; i++) {
			const tempArr = winningPositions[i]; // just an alias for ease
			if (
				arr[tempArr[0]] === 1 &&
				arr[tempArr[1]] === 1 &&
				arr[tempArr[2]] === 1
			)
				return "X";
			else if (
				arr[tempArr[0]] === 0 &&
				arr[tempArr[1]] === 0 &&
				arr[tempArr[2]] === 0
			)
				return "O";
		}

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === -1) {
				return null; // game not yet finished
			}
		}
		return drawMsg; // game draw
	};

	const _setSquareVal = (modifiedIdx: number) => {
		if (squareVals[modifiedIdx] === -1) {
			isTurn
				? setSquareVals((prevVals) =>
						prevVals.map((ele, idx) => (modifiedIdx === idx ? 0 : ele))
				  )
				: setSquareVals((prevVals) =>
						prevVals.map((ele, idx) => (modifiedIdx === idx ? 1 : ele))
				  );

			setIsTurn(!isTurn);
		}
	};

	const _onCloseModalCallback = () => {
		setSquareVals(Array(9).fill(-1));
		setGameFinishedandMsg("");
	};

	useEffect(() => {
		const winningVal = _isWinner(squareVals);
		if (winningVal) {
			winningVal === drawMsg
				? setGameFinishedandMsg(drawMsg)
				: setGameFinishedandMsg(`${winningVal} ${t("HAS_WON")}`);
		}
	}, [squareVals, t]);

	return (
		<section className="khelotsu-tictactoe">
			{squareVals.map((ele, idx) => (
				<div
					className="khelotsu-tictactoe-square"
					aria-label="tic tac toe square"
					key={idx}
					onClick={() => _setSquareVal(idx)}>
					<span>{ele === -1 ? "" : ele === 0 ? "O" : "X"}</span>
				</div>
			))}
			{gameFinishedandMsg && (
				<CustomModal
					headerName={gameFinishedandMsg}
					isOpen={!!gameFinishedandMsg.length}
					closeModal={_onCloseModalCallback}
					isInputNeeded={false}
					customStyle={{ width: "15rem", height: "4rem" }}
				/>
			)}
		</section>
	);
};

export default TicTacToe;
