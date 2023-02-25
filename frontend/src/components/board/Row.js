import Cell from "./Cell"
import "./Row.css"
function Row (props) {

    return (<div className="row">
                {props.cells.map((cell, index) => <Cell 
                                                    key={index} 
                                                    cellImage={cell.image} 
                                                    cellFunctions={props.cellFunctions}
                                                    x={cell.x}
                                                    y={cell.y}>
                                                </Cell>)}
            </div>
    )
}

export default Row