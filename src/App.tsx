import { FC, useState } from "react";
import { GameBoard } from "./assets/Components/GameBoard";
import { Log } from "./assets/Components/Log.component";
import { Player } from "./assets/Components/Player.component";
import { Turn } from "./assets/Components/types";

const App: FC = () => {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const handleClick = (rowIndex: number, colIndex: number) => {
    setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
    setGameTurns((prevState) => {
      let currentPlayer = "X";
      if (
        prevState.length > 0 &&
        prevState[prevState.length - 1].player == "X"
      ) {
        currentPlayer = "O";
      }
      const updatedTurns: Turn[] = [
        ...prevState,
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
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
