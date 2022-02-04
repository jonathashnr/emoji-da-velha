import { Player } from '../App'
import InputsWrapperStyles from './styles/InputsWrapper.styled'

interface Props {
    id: '1' | '2';
    onEmojiClick: (event: React.MouseEvent) => void;
    player: Player;
    setPlayer: React.Dispatch<React.SetStateAction<Player>>;
}

const InputsWrapper = ({ id, onEmojiClick, player, setPlayer }: Props) => {
    return (
        <InputsWrapperStyles>
            <span id={id} onClick={onEmojiClick}>{player.emoji}</span>
            <div className='playerNameForm'>
                <label htmlFor='p1form'>Jogador {id}:</label>
                <input
                    type='text'
                    id='p1form'
                    name='p1form'
                    value={player.name}
                    onChange={e => setPlayer({ ...player, name: e.target.value })}
                />
            </div>
        </InputsWrapperStyles>
    );
};

export default InputsWrapper;
