import ScoreboardStyles from './styles/Scoreboard.styled'
import { Board } from './Game'

interface Props {
    p1emoji: string;
    p2emoji: string;
    isGameHalted: boolean;
    isP1Turn: boolean;
    scoreBoard: Board;
}
const Scoreboard = ({p1emoji, p2emoji, scoreBoard, isP1Turn, isGameHalted} :Props) => {
    return (
        <ScoreboardStyles>
            <div className="grid">
                <span className='pointer textShadow'>{isGameHalted ? '': isP1Turn ? '👇' : ''}</span>
                <span></span>
                <span className='pointer textShadow'>{isGameHalted ? '': isP1Turn ? '' : '👇'}</span>
                <span className='emojiBoard boxShadow'>{p1emoji}</span>
                <span className='emojiBoard boxShadow'>👵</span>
                <span className='emojiBoard boxShadow'>{p2emoji}</span>
                {[scoreBoard.p1, scoreBoard.d, scoreBoard.p2]
                    .map((score, i) => <span className='scores boxShadow' key={`${i}-${score}`}>{score}</span>)
                }
            </div>
        </ScoreboardStyles>
    );
}

export default Scoreboard