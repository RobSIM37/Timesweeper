import { useState } from "react";
import { initBoard, gridToDisplay, updateBoard, autoReveal, isWin, isLoss, showAll, flagAll } from "../../utils/gamePlay";

import Board from "../board/Board";
function GamePlay (props) {
    const [gameOver, setGameOver] = useState(false);
    const [board, setBoard] = useState(initBoard(props.boardWidth, props.boardHeight));
    const [isFirstClick, setIsFirstClick] = useState(true);

    const checkGameOver = (board) => {
        if (isLoss(board)){
            board = showAll(board);
            setGameOver(true);
        } else if (isWin(board)) {
            board = flagAll(board);
            setGameOver(true);
        }
        return board;
    }
    const cellFunctions = {
        cellClicked: (x,y) => {
            if (board[y][x].marked === "flagged" || gameOver) return;
            let updatedBoard = board;
            if (isFirstClick) {
                updatedBoard = initBoard(props.boardWidth, props.boardHeight,{x,y},props.mineCount);
                setIsFirstClick(false);
            }
            updatedBoard = updateBoard(updatedBoard, x, y);
            updatedBoard = checkGameOver(updatedBoard);
            setBoard([...updatedBoard]);
        },
        cellDoubleClicked: (x,y) => {
            if (board[y][x].marked === "flagged" || gameOver) return;
            let updatedBoard = board;
            updatedBoard = autoReveal(updatedBoard,x,y);
            updatedBoard = checkGameOver(updatedBoard);
            setBoard([...updatedBoard]);
        },
        cellRightClicked: (x,y) => {
            if (!board[y][x].hidden || gameOver) return;
            let updatedBoard = board;
            switch (updatedBoard[y][x].marked){
                case "":
                    updatedBoard[y][x].marked = "flagged"
                    break;
                case "flagged":
                    updatedBoard[y][x].marked = ""
                    break;
                default:
            }
            setBoard([...updatedBoard]);
        }
    }
    return (
        <div className="game-play">
            <Board grid={gridToDisplay(board)} cellFunctions={cellFunctions}></Board>
        </div>
    );
}

export default GamePlay