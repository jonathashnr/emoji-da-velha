import { useContext, useEffect, useState } from 'react';
import { PlayersContext } from '../App';
import GameStyles from './styles/Game.styled';

export interface Points {
    p1: number;
    p2: number;
}
const GAME_ARR = [
    1, 0, 0,
    0, 2, 0,
    0, 0, 0
];
const Game = () => {
    const {
        player1,
        player2,
        setPlayer1,
        setPlayer2,
    } = useContext(PlayersContext)
    const [isGameHalted, setIsGameHalted] = useState<boolean>(false);
    const [points, setPoints] = useState<Points>({ p1: 0, p2: 0 })
    const [gameArr, setGameArr] = useState(GAME_ARR);
    const [isP1Turn, setIsP1Turn] = useState<boolean>(true);
    useEffect(() => {

    }, [gameArr]);

    const handleCelClick = (event: React.MouseEvent) => {
        const cel = parseInt(event.currentTarget.id);
        if (!gameArr[cel] || gameArr[cel] > 2) {
            const newArr = [...gameArr];
            newArr[cel] = isP1Turn ? 1 : 2;
            setGameArr(newArr);
            setIsP1Turn(!isP1Turn);
        }
    }
    const handleCelMouseIn = (event: React.MouseEvent) => {
        const cel = parseInt(event.currentTarget.id);
        if (!gameArr[cel]) {
            const newArr = [...gameArr];
            newArr[cel] = isP1Turn ? 3 : 4;
            setGameArr(newArr);
        }
    }
    const handleCelMouseOut = (event: React.MouseEvent) => {
        const cel = parseInt(event.currentTarget.id);
        if (gameArr[cel] > 2) {
            const newArr = [...gameArr];
            newArr[cel] = 0;
            setGameArr(newArr);
        };
    }
    const checkWin = (arr: number[]) => {
        const rowIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        const columnIndexes = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const diagonalIndexes = [[0, 4, 8], [2, 4, 6]];

        const checkIndexes = (indexes: number[][]) => {
            return indexes.reduce(
                (control, [i0, i1, i2]) =>
                    arr[i0] && arr[i0] === arr[i1] && arr[i1] === arr[i2] ? true : control
                , false);
        }
        return checkIndexes(rowIndexes) || checkIndexes(columnIndexes) || checkIndexes(diagonalIndexes);
    }
    const renderCel = (cel: number, i: number) => {
        switch (cel) {
            case 1:
                return <div onClick={handleCelClick} key={i} id={i.toString()}><span>{player1.emoji}</span></div>
            case 2:
                return <div onClick={handleCelClick} key={i} id={i.toString()}><span>{player2.emoji}</span></div>
            case 3:
                return <div onMouseLeave={handleCelMouseOut} onClick={handleCelClick} key={i} id={i.toString()}><span style={{ opacity: '0.4' }}>{player1.emoji}</span></div>
            case 4:
                return <div onMouseLeave={handleCelMouseOut} onClick={handleCelClick} key={i} id={i.toString()}><span style={{ opacity: '0.4' }}>{player2.emoji}</span></div>
            case 0:
            default:
                return <div onMouseOver={handleCelMouseIn} onClick={handleCelClick} key={i} id={i.toString()}></div>
        }
    }

    return (
        <GameStyles>
            <header>
                <div id='ph1' className='playerHeader'>
                    <span className='headerEmoji'>{player1.emoji}</span>
                    <div className='headerPlayerWrapper'>
                        <div>{player1.name}</div>
                        <div>{`Points ${points.p1}`}</div>
                    </div>
                </div>
                <div id='ph2' className='playerHeader'>
                    <div className='headerPlayerWrapper'>
                        <div>{player2.name}</div>
                        <div>{`Points ${points.p2}`}</div>
                    </div>
                    <span className='headerEmoji'>{player2.emoji}</span>
                </div>
            </header>
            <div id='game'>
                {gameArr.map((cel,i) => renderCel(cel,i))}
            </div>
        </GameStyles>
    );
};

export default Game;
