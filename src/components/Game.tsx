import React, { useContext, useState, useRef } from "react";
import PlayersContext from "../PlayersContext";
import GameStyles from "./styles/Game.styled";
import checkGameResult from "../CheckGameResult";
import Scoreboard from "./Scoreboard";
import { Board } from "../Types";

const GAME_ARR = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function Game() {
  const { emoji1, emoji2 } = useContext(PlayersContext);
  const gameArr = useRef(GAME_ARR);
  const scoreBoard = useRef<Board>({ p1: 0, p2: 0, d: 0 });
  const hasP1started = useRef<boolean>(true);
  const isP1Turn = useRef<boolean>(true);
  const isGameHalted = useRef<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [gameView, setGameView] = useState(prepareGameView());

  // Rendering Helpers
  function prepareGameView() {
    return gameArr.current.map((value, i) => {
      let emoji = "";
      if (value === 1) {
        emoji = emoji1;
      } else if (value === 2) {
        emoji = emoji2;
      }
      return {
        key: `cel${i + 1}`,
        emoji,
        className: "",
        style: {},
        index: i,
      };
    });
  }
  const prepareHoverView = (hoverIdx: number) => {
    const phamtomEmoji = isP1Turn.current ? emoji1 : emoji2;
    return gameView.map((cel, i) => {
      return hoverIdx !== i
        ? cel
        : { ...cel, emoji: phamtomEmoji, className: "opctHalf" };
    });
  };
  const prepareVictoryView = ([i1, i2, i3]: number[]) => {
    return prepareGameView().map((cel, i) => {
      return i === i1 || i === i2 || i === i3
        ? { ...cel, className: "pulsar" }
        : { ...cel, className: "opctLow" };
    });
  };
  const prepareDrawView = () => {
    return prepareGameView().map((cel) => ({
      ...cel,
      className: "pulsar opctLow",
    }));
  };

  // Game Flow and Logic
  const doMatchRestart = (scores: Board) => {
    setTimeout(() => {
      gameArr.current = [...GAME_ARR];
      scoreBoard.current = scores;
      isGameHalted.current = false;
      hasP1started.current = !hasP1started.current;
      isP1Turn.current = hasP1started.current;
      setGameView(prepareGameView());
    }, 2000);
  };
  const doAfterEachTurn = () => {
    const [hasFinished, isDraw, winnerArr] = checkGameResult(gameArr.current);
    if (hasFinished) {
      const newScoreBoard = { ...scoreBoard.current };
      isGameHalted.current = true;
      if (isDraw) {
        newScoreBoard.d += 1;
        setGameView(prepareDrawView());
      } else {
        if (isP1Turn.current) {
          newScoreBoard.p1 += 1;
        } else {
          newScoreBoard.p2 += 1;
        }
        setGameView(prepareVictoryView(winnerArr));
      }
      doMatchRestart(newScoreBoard);
    } else {
      isP1Turn.current = !isP1Turn.current;
      setGameView(prepareGameView());
    }
  };

  // Event handlers
  const handleCelClick = (index: number) => {
    if (!gameArr.current[index]) {
      const newArr = [...gameArr.current];
      newArr[index] = isP1Turn.current ? 1 : 2;
      gameArr.current = newArr;
      doAfterEachTurn();
    }
  };
  const handleCelMouseIn = (index: number) => {
    if (!gameArr.current[index]) {
      setGameView(prepareHoverView(index));
    }
  };
  const handleCelMouseOut = (index: number) => {
    if (!gameArr.current[index]) {
      setGameView(prepareGameView());
    }
  };

  return (
    <GameStyles>
      <Scoreboard
        p1emoji={emoji1}
        p2emoji={emoji2}
        isGameHalted={isGameHalted.current}
        isP1Turn={isP1Turn.current}
        scoreBoard={{ ...scoreBoard.current }}
      />
      <div id="game">
        {gameView.map((cel) => (
          <button
            type="button"
            key={cel.key}
            onClick={
              isGameHalted.current ? undefined : () => handleCelClick(cel.index)
            }
            onMouseOver={
              isGameHalted.current
                ? undefined
                : () => handleCelMouseIn(cel.index)
            }
            onMouseLeave={
              isGameHalted.current
                ? undefined
                : () => handleCelMouseOut(cel.index)
            }
          >
            <span className={cel.className} style={cel.style}>
              {cel.emoji}
            </span>
          </button>
        ))}
      </div>
    </GameStyles>
  );
}

export default Game;
