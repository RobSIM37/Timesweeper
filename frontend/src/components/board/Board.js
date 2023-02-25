import Row from "./Row";
import "./Board.css"
function Board (props) {
    return (
        <div className="board">
            {props.grid.map((row, index) => <Row key={index} cells={row} cellFunctions={props.cellFunctions}></Row>)}
        </div>
    )
}

export default Board