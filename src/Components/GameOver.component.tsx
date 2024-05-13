import { FC } from "react";
interface GameOverProps {
  winner: string|null;
}

export const GameOver: FC<GameOverProps> = ({ winner }) => {
  return (
    <div id="game-over">
      <h2>Game over</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && <p>Its a Draw!</p>}

      <button>REMATCH</button>
    </div>
  );
};
