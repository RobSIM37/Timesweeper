import { useState } from "react";
import { initBoard, gridToDisplay, updateBoard, autoReveal } from "../../utils/gamePlay";

import Board from "../board/Board";
function GamePlay (props) {
    const [board, setBoard] = useState(initBoard(30, 16));
    const [isFirstClick, setIsFirstClick] = useState(true);

  const cellFunctions = {
    cellClicked: (x,y) => {
        if (board[y][x].marked === "flagged") return;
        let updatedBoard = board;
        if (isFirstClick) {
            updatedBoard = initBoard(30,16,{x,y},99);
            setIsFirstClick(false);
        }
        updatedBoard = [...updateBoard(updatedBoard, x, y)];
        setBoard(updatedBoard);
    },
    cellDoubleClicked: (x,y) => {
        if (board[y][x].marked === "flagged") return;
        let updatedBoard = board;
        updatedBoard = autoReveal(updatedBoard,x,y);
        setBoard([...updatedBoard]);
    },
    cellRightClicked: (x,y) => {
        if (!board[y][x].hidden) return;
        let updatedBoard = board;
        switch (updatedBoard[y][x].marked){
            case "":
                updatedBoard[y][x].marked = "flagged"
                break;
            case "flagged":
                updatedBoard[y][x].marked = "question"
                break;
            case "question":
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