import { FC, useState } from "react";
interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
  onSavePlayer: (symbol: string, newName: string) => void;
}
export const Player: FC<PlayerProps> = ({
  initialName,
  symbol,
  isActive,
  onSavePlayer,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(initialName);

  const handleSave = () => {
    setIsEditMode((prevState) => {
      return !prevState;
    });
    if (isEditMode) {
      onSavePlayer(symbol, name);
    }
  };
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {!isEditMode ? (
            <span className="player-name">{name}</span>
          ) : (
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={() => handleSave()}>
          {!isEditMode ? "Edit" : "Save"}
        </button>
      </li>
    </>
  );
};
