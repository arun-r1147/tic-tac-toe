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

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const derivedGameBoard = (gameTurns: Turn[]) => {
  const gameBoard = [...initialBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

const derivedWinner = (
  gameBoard: CellValue[][],
  players: {
    [key: string]: string;
  }
) => {
  let winner = null;
  for (const combo of WINNING_COMBOS) {
    const firstCombo = gameBoard[combo[0].row][combo[0].column];
    const secondCombo = gameBoard[combo[1].row][combo[1].column];
    const thirdCombo = gameBoard[combo[2].row][combo[2].column];
    if (firstCombo && firstCombo === secondCombo && firstCombo === thirdCombo) {
      winner = players[firstCombo];
    }
  }
  return winner;
};

function derivedActivePlayer(gameTurns: Turn[]) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[gameTurns.length - 1].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const App: FC = () => {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [players, setPlayers] = useState<{
    [key: string]: string;
  }>(PLAYERS);
  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);

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

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handleSavePlayerName = (symbol: string, newName: string) => {
    setPlayers((prevValue) => {
      return { ...prevValue, [symbol]: newName };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName={PLAYERS.X}
            symbol="X"
            onSavePlayer={(symbol, newName) =>
              handleSavePlayerName(symbol, newName)
            }
          />
          <Player
            isActive={activePlayer === "O"}
            initialName={PLAYERS.O}
            symbol="0"
            onSavePlayer={(symbol, newName) =>
              handleSavePlayerName(symbol, newName)
            }
          />
        </ol>
        {(winner || isGameDraw) && (
          <GameOver onReset={handleRestart} winner={winner} />
        )}
        <GameBoard board={gameBoard} onSelect={handleClick} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
};

export default App;
