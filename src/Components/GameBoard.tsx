import { FC } from "react";
interface GameBoardProps {
  onSelect: (rowIndex: number, colIndex: number) => void;
  board:CellValue[][];
}
type CellValue = string | null

export const GameBoard: FC<GameBoardProps> = ({ onSelect, board }) => {
  

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
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
