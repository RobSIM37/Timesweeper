import hidden from "../../resources/cell/hidden.png";
import redFlag from "../../resources/cell/redFlag.png";
import greenFlag from "../../resources/cell/greenFlag.png";
import incorrectFlag from "../../resources/cell/incorrectFlag.png";
import mine from "../../resources/cell/mine.png";
import clearedMine from "../../resources/cell/clearedMine.png"
import empty from "../../resources/cell/empty.png";
import one from "../../resources/cell/one.png";
import two from "../../resources/cell/two.png";
import three from "../../resources/cell/three.png";
import four from "../../resources/cell/four.png";
import five from "../../resources/cell/five.png";
import six from "../../resources/cell/six.png";
import seven from "../../resources/cell/seven.png";
import eight from "../../resources/cell/eight.png";

function Cell(props) {
    let image = null;
    switch (props.cellImage) {
        case "hidden":
            image = hidden;
            break;
        case "redFlag":
            image = redFlag;
            break;
        case "greenFlag":
            image = greenFlag;
            break;
        case "incorrectFlag":
            image = incorrectFlag;
            break;
        case "mine":
            image = mine;
            break;
        case "clearedMine":
            image = clearedMine;
            break;
        case "0":
            image = empty;
            break;
        case "1":
            image = one;
            break;
        case "2":
            image = two;
            break;
        case "3":
            image = three;
            break;
        case "4":
            image = four;
            break;
        case "5":
            image = five;
            break;
        case "6":
            image = six;
            break;
        case "7":
            image = seven;
            break;
        case "8":
            image = eight;
            break;
        default:
    }

    const imageClickHandler = () => {
        props.cellFunctions.cellClicked(props.x, props.y)
    }

    const imageDoubleClickHandler = () => {
        props.cellFunctions.cellDoubleClicked(props.x, props.y)
    }

    const imageRightClickHandler = (e) => {
        e.preventDefault()
        props.cellFunctions.cellRightClicked(props.x, props.y)
    }

    return (
        <img alt="" className="cell" src={image}
            onClick={imageClickHandler}
            onDoubleClick={imageDoubleClickHandler}
            onContextMenu={imageRightClickHandler}>
        </img>
    )
}

export default Cell;