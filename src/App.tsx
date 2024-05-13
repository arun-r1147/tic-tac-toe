import { FC, useState } from "react";
import { GameBoard } from "./assets/Components/GameBoard";
import { Log } from "./assets/Components/Log.component";
import { Player } from "./assets/Components/Player.component";
import { Turn } from "./assets/Components/types";

function derivedActivePlayer(gameTurns:Turn[]){
  let currentPlayer = "X";
  if (
    gameTurns.length > 0 &&
    gameTurns[gameTurns.length - 1].player == "X"
  ) {
    currentPlayer = "O";
  }
  return currentPlayer
}

const App: FC = () => {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const activePlayer = derivedActivePlayer(gameTurns)
  const handleClick = (rowIndex: number, colIndex: number) => {
    // setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
    setGameTurns((prevState) => {
      const activePlayer = derivedActivePlayer(prevState)
      const updatedTurns: Turn[] = [
        ...prevState,
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
      ];
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName="Player 1"
            symbol="X"
          />
          <Player
            isActive={activePlayer === "O"}
            initialName="Player 2"
            symbol="0"
          />
        </ol>
        <GameBoard turns={gameTurns} onSelect={handleClick} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
