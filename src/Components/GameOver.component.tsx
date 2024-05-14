import { FC } from "react";
interface GameOverProps {
  winner: string | null;
  onReset: () => void;
}

export const GameOver: FC<GameOverProps> = ({ winner, onReset }) => {
  return (
    <div id="game-over">
      <h2>Game over</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && <p>Its a Draw!</p>}

      <button onClick={onReset}>REMATCH</button>
    </div>
  );
};
