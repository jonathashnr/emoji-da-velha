import { useContext, useEffect, useState, useRef } from 'react';
import { PlayersContext } from '../App';
import GameStyles from './styles/Game.styled';
import checkGameResult from '../CheckGameResult';
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
    const { player1, player2 } = useContext(PlayersContext)
    const isGameHalted = useRef<boolean>(false);
    const [gameArr, setGameArr] = useState(GAME_ARR);
    const [gameView, setGameView] = useState(createGameView());
    const [isP1Turn, setIsP1Turn] = useState<boolean>(false);
    const scoreBoard = useRef<Board>({ p1: 0, p2: 0, d: 0 })
    const hasP1started = useRef<boolean>(true);

    useEffect(() => {
        setGameView(createGameView());
        const [hasFinished, isDraw, winnerArr] = checkGameResult(gameArr);
        if (hasFinished) {
            isGameHalted.current = true;
            if (!isDraw) {
                setGameView(createVictoryView(winnerArr));
                isP1Turn ? scoreBoard.current.p1++ : scoreBoard.current.p2++;
            } else {
                setGameView(createDrawView());
                scoreBoard.current.d++;
            }
            matchRestart();
        } else {
            setIsP1Turn(!isP1Turn);
        }
    }, [gameArr]);

    function createGameView() {
        return gameArr.map((value, i) => {
            return {
                key: `cel${i + 1}`,
                emoji: value === 1 ? player1.emoji : value === 2 ? player2.emoji : '',
                className: '',
                style: {},
                index: i,
            }
        })
    }

    const matchRestart = () => {
        setTimeout(() => {
            setGameArr(GAME_ARR);
            isGameHalted.current = false;
            hasP1started.current = !hasP1started.current
            setIsP1Turn(hasP1started.current);
        },2000)
    }

    const createHoverGameView = (hoverIdx: number, styles: object) => {
        const phamtomEmoji = isP1Turn ? player1.emoji : player2.emoji;
        return gameView.map((cel, i) => {
            return hoverIdx !== i ? cel : { ...cel, emoji: phamtomEmoji, style: styles }
        })
    }
    const createVictoryView = ([i1, i2, i3]: number[]) => {
        return createGameView().map((cel, i) => {
            return i === i1 ||
                i === i2 ||
                i === i3 ?
                { ...cel, className: 'pulsar' }
                : { ...cel, style: { opacity: '0.3' } }
        })
    }
    const createDrawView = () => {
        return createGameView().map((cel) => ({ ...cel, className: 'pulsar',style: { opacity: '0.3' }}))
    }

    const handleCelClick = (index: number) => {
        if (!gameArr[index]) {
            const newArr = [...gameArr];
            newArr[index] = isP1Turn ? 1 : 2;
            setGameArr(newArr);
        }
    }
    const handleCelMouseIn = (index: number) => {
        if (!gameArr[index]) {
            setGameView(createHoverGameView(index, { opacity: '0.6' }));
        }
    }
    const handleCelMouseOut = (index: number) => {
        if (!gameArr[index]) {
            setGameView(createGameView());
        }
    }

    return (
        <GameStyles>
            <header>
                <div id='ph1' className='playerHeader' style={isGameHalted.current ? {} : isP1Turn ? {} : {opacity: '0.2'}}>
                    <span className='headerEmoji'>{player1.emoji}</span>
                    <p className='pName'>{player1.name}</p>
                </div>
                <span>VS</span>
                <div id='ph2' className='playerHeader' style={isGameHalted.current ? {} : isP1Turn ? { opacity: '0.2' } : {}}>
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
