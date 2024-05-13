import { FC } from "react";
import { Turn } from "./types";
interface GameBoardProps {
  onSelect: (rowIndex: number, colIndex: number) => void;
  turns: Turn[];
}
type CellValue = string | null;
const initialBoard: CellValue[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export const GameBoard: FC<GameBoardProps> = ({ onSelect, turns }) => {
  const gameBoard = [...initialBoard];
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerIcon, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelect(rowIndex, colIndex)} disabled={playerIcon !==null}>
                  {playerIcon}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};
