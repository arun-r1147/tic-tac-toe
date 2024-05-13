import { FC } from "react";
import { Turn } from "./types";
interface LogProps {
  turns: Turn[];
}

export const Log: FC<LogProps> = ({ turns }) => {
  return (
    <>
      <ol id="log">
        {turns.map((turn) => (
          <li key={`${turn.square.row}${turn.square.col}`}>
            {turn.player}selected {turn.square.row},{turn.square.col}
          </li>
        ))}
      </ol>
    </>
  );
};
