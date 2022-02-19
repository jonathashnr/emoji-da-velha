import React from "react";
import ScoreboardStyles from "./styles/Scoreboard.styled";
import { Board } from "../Types";

interface Props {
  p1emoji: string;
  p2emoji: string;
  isGameHalted: boolean;
  isP1Turn: boolean;
  scoreBoard: Board;
}
function Scoreboard({
  p1emoji,
  p2emoji,
  scoreBoard,
  isP1Turn,
  isGameHalted,
}: Props) {
  const showPointer = (isCelP1: boolean): string => {
    if (isGameHalted) {
      return "";
    }
    if (isP1Turn === isCelP1) {
      return "👇";
    }
    return "";
  };
  return (
    <ScoreboardStyles>
      <div className="grid">
        <span className="pointer textShadow">{showPointer(true)}</span>
        <span />
        <span className="pointer textShadow">{showPointer(false)}</span>
        <span className="emojiBoard boxShadow">{p1emoji}</span>
        <span className="emojiBoard boxShadow">👵</span>
        <span className="emojiBoard boxShadow">{p2emoji}</span>
        {[scoreBoard.p1, scoreBoard.d, scoreBoard.p2].map((score, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span className="scores boxShadow" key={`${i}-${score}`}>
            {score}
          </span>
        ))}
      </div>
    </ScoreboardStyles>
  );
}

export default Scoreboard;
