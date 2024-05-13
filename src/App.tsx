import { FC, useState } from "react";
import { GameBoard } from "./Components/GameBoard";
import { Log } from "./Components/Log.component";
import { Player } from "./Components/Player.component";
import { Turn } from "./Components/types";
import { WINNING_COMBOS } from "./Components/Shared/Winning_combos";
import { GameOver } from "./Components/GameOver.component";

type CellValue = string | null;
const initialBoard: CellValue[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns: Turn[]) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[gameTurns.length - 1].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const App: FC = () => {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const activePlayer = derivedActivePlayer(gameTurns);
  let winner = null;

  const gameBoard = [...initialBoard];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  for (const combo of WINNING_COMBOS) {
    const firstCombo = gameBoard[combo[0].row][combo[0].column];
    const secondCombo = gameBoard[combo[1].row][combo[1].column];
    const thirdCombo = gameBoard[combo[2].row][combo[2].column];
    if (firstCombo && firstCombo === secondCombo && firstCombo === thirdCombo) {
      winner = firstCombo;
    }
  }
  const isGameDraw = gameTurns.length === 9 && !winner;

  const handleClick = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevState) => {
      const activePlayer = derivedActivePlayer(prevState);
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
        {(winner || isGameDraw) && <GameOver winner={winner} />}
        <GameBoard board={gameBoard} onSelect={handleClick} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
