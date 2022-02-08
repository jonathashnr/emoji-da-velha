import { useContext, useState, useRef } from 'react';
import { PlayersContext } from '../App';
import GameStyles from './styles/Game.styled';
import checkGameResult from '../CheckGameResult';
import Scoreboard from './Scoreboard';
export interface Board {
    p1: number;
    p2: number;
    d: number;
}
const GAME_ARR = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

const Game = () => {
    const { player1, player2 } = useContext(PlayersContext);
    const gameArr = useRef(GAME_ARR);
    const scoreBoard = useRef<Board>({ p1: 0, p2: 0, d: 0 })
    const hasP1started = useRef<boolean>(true);
    const isP1Turn = useRef<boolean>(true);
    const isGameHalted = useRef<boolean>(false);
    const [gameView, setGameView] = useState(prepareGameView());

    // Game Flow and Logic
    const doAfterEachTurn = () => {
        const [hasFinished, isDraw, winnerArr] = checkGameResult(gameArr.current);
        if (hasFinished) {
            isGameHalted.current = true;
            if (isDraw) {
                scoreBoard.current.d++;
                setGameView(prepareDrawView());
            } else {
                isP1Turn.current ? scoreBoard.current.p1++ : scoreBoard.current.p2++;
                setGameView(prepareVictoryView(winnerArr));
            }
            doMatchRestart();
        } else {
            isP1Turn.current = !isP1Turn.current;
            setGameView(prepareGameView());
        }
    }
    const doMatchRestart = () => {
        setTimeout(() => {
            gameArr.current = [...GAME_ARR];
            isGameHalted.current = false;
            hasP1started.current = !hasP1started.current
            isP1Turn.current = hasP1started.current;
            setGameView(prepareGameView());
        }, 2000)
    }

    // Rendering Helpers
    function prepareGameView() {
        return gameArr.current.map((value, i) => {
            return {
                key: `cel${i + 1}`,
                emoji: value === 1 ? player1.emoji : value === 2 ? player2.emoji : '',
                className: '',
                style: {},
                index: i,
            }
        })
    }
    const prepareHoverView = (hoverIdx: number) => {
        const phamtomEmoji = isP1Turn.current ? player1.emoji : player2.emoji;
        return gameView.map((cel, i) => {
            return hoverIdx !== i ? cel : { ...cel, emoji: phamtomEmoji, className: 'opctHalf' }
        })
    }
    const prepareVictoryView = ([i1, i2, i3]: number[]) => {
        return prepareGameView().map((cel, i) => {
            return i === i1 ||
                i === i2 ||
                i === i3 ?
                { ...cel, className: 'pulsar' }
                : { ...cel, className: 'opctLow' }
        })
    }
    const prepareDrawView = () => {
        return prepareGameView().map((cel) => ({ ...cel, className: 'pulsar opctLow' }))
    }

    // Event handlers
    const handleCelClick = (index: number) => {
        if (!gameArr.current[index]) {
            const newArr = [...gameArr.current];
            newArr[index] = isP1Turn.current ? 1 : 2;
            gameArr.current = newArr;
            doAfterEachTurn();
        }
    }
    const handleCelMouseIn = (index: number) => {
        if (!gameArr.current[index]) {
            setGameView(prepareHoverView(index));
        }
    }
    const handleCelMouseOut = (index: number) => {
        if (!gameArr.current[index]) {
            setGameView(prepareGameView());
        }
    }

    return (
        <GameStyles>
            <Scoreboard
                p1emoji={player1.emoji}
                p2emoji={player2.emoji}
                isGameHalted={isGameHalted.current}
                isP1Turn={isP1Turn.current}
            />
            <header>
                <div id='ph1' className='playerHeader' style={isGameHalted.current ? {} : isP1Turn.current ? {} : {opacity: '0.2'}}>
                    <span className='headerEmoji'>{player1.emoji}</span>
                    <p className='pName'>{player1.name}</p>
                </div>
                <span>VS</span>
                <div id='ph2' className='playerHeader' style={isGameHalted.current ? {} : isP1Turn.current ? { opacity: '0.2' } : {}}>
                    <div className='pName'>{player2.name}</div>
                    <span className='headerEmoji'>{player2.emoji}</span>
                </div>
            </header>
            <div id='game'>
                {gameView.map(cel =>
                    <div
                        key={cel.key}
                        onClick={isGameHalted.current ? undefined: e => handleCelClick(cel.index)}
                        onMouseOver={isGameHalted.current ? undefined : e => handleCelMouseIn(cel.index)}
                        onMouseLeave={isGameHalted.current ? undefined : e => handleCelMouseOut(cel.index)}
                    >
                        <span className={cel.className} style={cel.style}>{cel.emoji}</span>
                    </div>
                )}
            </div>
            <span id='scoreBoard'>{scoreBoard.current.p1} - {scoreBoard.current.d} - {scoreBoard.current.p2}</span>
        </GameStyles>
    );
};

export default Game;
