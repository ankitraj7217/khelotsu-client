import React, { useState } from "react";
import { chessRanks, chessFiles, initInitialPiecePos, setPos, getValidPos, removeReachDot, isPieceOnPos, getPieceType } from "./chess.utils";

import "./Chess.scss";

const Chess = () => {
    const [chessPos, setChessPos] = useState<Array<Array<String>>>(initInitialPiecePos);
    const [whoseTurn, setWhoseTurn] = useState<'w' | 'b'>('w'); // white -> default -> use context later to transfer data

    const _onDragStart = (e: any) => {
        //TODO: implement restricting dragging out of board
        //TODO: ensure only bg image gets dragged, not square
        e.dataTransfer.setData("text/plain", JSON.stringify(Array.from(e.target.classList)));
    }

    const _onDrop = (e: any) => {
        //TODO: make it more generic
        // TODO: instead of assuming classList is at last, make it generic
        const arr2d = [...chessPos]
        const incomingList = JSON.parse(e.dataTransfer.getData("text"));
        const incomingPos = incomingList[incomingList.length - 1];
        const incomingPiece = incomingList[incomingList.length - 2];
        const currentList: Array<string> = Array.from(e.target.classList);
        const currentPos: string = currentList[currentList.length - 1];

        const pieceType = getPieceType(incomingPiece);
        if (pieceType !== whoseTurn) return;

        const validPos = getValidPos([...arr2d], incomingPiece, incomingPos);
        
        if (validPos.includes(currentPos)) {
            setPos(arr2d, incomingPos, "");
            setPos(arr2d, currentPos, incomingPiece);

            // these are set states
            setChessPos(_ => [...arr2d]);
            setWhoseTurn(prev => prev === "w" ? "b" : "w");
        }
    }

    const _onDragOver = (e: any) => {
        e.preventDefault();
    }

    const _onMouseOver = (e: any) => {
        const arr2d = [...chessPos];
        const currClassList: Array<String> = Array.from(e.target.classList);
        const currIdx = currClassList[currClassList.length - 1];
        const pieceType: String = currClassList[currClassList.length - 2];

        const validPos = getValidPos(arr2d, pieceType, currIdx);

        const removeArr2d = removeReachDot(arr2d);
        setChessPos(_ => [...removeArr2d]);

        validPos && validPos.length && validPos.forEach((pos) => {
            const [row, col] = pos.split("").map(Number);
            if (isPieceOnPos(arr2d, row, col)) { } // Don't replace already placed piece
            else if (arr2d[row][col] === ".") arr2d[row][col] = "";
            else arr2d[row][col] = "."; // if "" is there
        })

        // so that time to remove when mouse leave
        setChessPos(_ => [...arr2d]);
    }

    const _onMouseLeave = (e: any) => {
        const arr2d = [...chessPos];
        const removedArr2d = removeReachDot(arr2d);
        setChessPos(_ => [...removedArr2d]);
    }

    return (
        <section className="chess">
            <div className="chess-ranks">
                {
                    chessRanks.map(ele => <div key={9 - ele} className="chess-ranks-rank">{9 - ele}</div>)
                }
            </div>
            <div className="chess-board" onDrop={_onDrop} onDragOver={_onDragOver}
                onMouseOver={_onMouseOver} onMouseLeave={_onMouseLeave}>
                {
                    chessRanks.flatMap((rank, idx1) =>
                        chessFiles.map((file, idx2) => {
                            const bgColorClassName = (idx1 + idx2) % 2 === 0 ? "chess-col-l" : "chess-col-d"
                            const pieceName = chessPos[idx1][idx2];
                            const posVal = `${idx1}${idx2}`
                            return (
                                <div key={`${9 - rank}${file}`}
                                    draggable
                                    className={`chess-board-block ${bgColorClassName} 
                                                piece ${pieceName === "" || pieceName === "." ?
                                            pieceName === "" ? "empty" : "empty reach" : `occupied ${pieceName}`} ${posVal}`}
                                    onDragStart={_onDragStart}
                                ></div>
                            )
                        })
                    )
                }
            </div>
            <div className="chess-files">
                {
                    chessFiles.map(ele => <div key={ele} className="chess-files-file">{ele}</div>)
                }
            </div>
        </section>
    )
}

export default Chess;