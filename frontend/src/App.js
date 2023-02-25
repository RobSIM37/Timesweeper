import { useState } from "react"
import './App.css';
import GamePlay from "./components/views/GamePlay";

function App() {
  
  const [view, setView] = useState("gamePlay");

  switch (view) {
    case "gamePlay":
      return (<div className="App">
                <GamePlay setView={setView}></GamePlay>
              </div>)
    default:
      return <div className="App"></div>
  }
}

export default App;