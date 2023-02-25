const pullFromArray = (arr) => {
    const rndIndex = randomIndex(arr);
    const pulledCell = arr.splice(rndIndex,1)[0]
    return pulledCell;
}

const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

const distanceBetweenPoints = (a,b) => {
    return Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2)
}

const populateBoard = (board, firstClick, mineCount) => {
    const emptyCells = [];
    board.forEach(row=>row.forEach(cell=>{
        if (distanceBetweenPoints(firstClick,cell) >=2) {
            emptyCells.push(cell)
        }
    }));
    for (let m=0; m<mineCount; m++){
        const newMine = pullFromArray(emptyCells);
        newMine.isMine = true
        if (m===0) {
            newMine.isTimebomb = true;
        }
    }
    board.forEach(row=>row.forEach(cell=>{
        let neighborCount = 0;
        const boardWidth = board[0].length;
        const boardHeight = board.length;
        for (let dX = -1; dX<2; dX++){
            for(let dY = -1; dY<2; dY++){
                if (!(dX === 0 && dY === 0)
                    && cell.x + dX >= 0 && cell.x + dX < boardWidth
                    && cell.y + dY >= 0 && cell.y + dY < boardHeight
                    && board[cell.y + dY][cell.x+dX].isMine) {
                        neighborCount++
                    }
            }
        }
        cell.neighbors = neighborCount;
    }));
    return board;
}

export const initBoard = (width, height, firstClick=null, mineCount=0) => {

    const board = [];
    for (let y=0; y < height; y++) {
        const row = [];
        for (let x=0; x < width; x++) {
            row.push({
                hidden: true,
                marked: "",
                isMine: false,
                isTimebomb: false,
                neighbors: 0,
                x,
                y
            })
        }
        board.push(row);
    }
    if (!firstClick) {
        return [...board]
    } else {
        return populateBoard(board, firstClick, mineCount)
    }
}

export const gridToDisplay = (grid) => {
    return grid.map(row => {
        return row.map(cell => {
            if (cell.hidden) {
                if (cell.marked === "flagged") {
                    if (cell.isTimebomb) {
                        return {image: "greenFlag", x: cell.x, y: cell.y}
                    } else {
                        return {image: "redFlag", x: cell.x, y: cell.y}
                    }
                } else if (cell.marked === "question") {
                    return {image: "question", x: cell.x, y: cell.y}
                } else {
                    return {image: "hidden", x: cell.x, y: cell.y}
                }
            } else {
                if (cell.isMine) {
                    return {image: "mine", x: cell.x, y: cell.y}
                } else {
                    return {image: `${cell.neighbors}`, x: cell.x, y: cell.y}
                }
            }
        })
    })
}

export const updateBoard = (board,x,y) => {
    board[y][x].hidden = false
    if (board[y][x].neighbors === 0) {
       for (let dX = -1; dX < 2; dX++) {
            for (let dY = -1; dY < 2; dY++) {
                if (x + dX >= 0 && x + dX < board[0].length &&
                    y + dY >= 0 && y + dY < board.length &&
                    board[y+dY][x+dX].hidden){
                        updateBoard(board, x+dX,y+dY)
                    }
            }
        } 
    }
    return board;
}

export const autoReveal = (board, x, y) => {
    let flagCount = 0;
    const cellsToReveal = [];
    for (let dX = -1; dX < 2; dX++) {
        for (let dY = -1; dY < 2; dY++) {
            if (x + dX >= 0 && x + dX < board[0].length &&
                y + dY >= 0 && y + dY < board.length) {
                    if (board[y+dY][x+dX].marked === "flagged"){
                        flagCount++
                    }
                    if (board[y+dY][x+dX].hidden && board[y+dY][x+dX].marked === ""){
                        cellsToReveal.push({x:x+dX, y:y+dY})
                    }
                } 
        }
    }
    if (flagCount === board[y][x].neighbors) {
        cellsToReveal.forEach(cell=> board = updateBoard(board, cell.x, cell.y))
    }
    return board;
}