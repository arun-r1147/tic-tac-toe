import { FC, useState } from "react";
interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
}
export const Player: FC<PlayerProps> = ({ initialName, symbol, isActive }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(initialName);
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
        <button
          onClick={() => {
            setIsEditMode((prevState) => {
              return !prevState;
            });
          }}
        >
          {!isEditMode ? "Edit" : "Save"}
        </button>
      </li>
    </>
  );
};
