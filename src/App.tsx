import { FC } from "react";
import { Player } from "./assets/Components/Player.component";
const App: FC = () => {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="0" />
        </ol>
      </div>
    </main>
  );
};

export default App;
