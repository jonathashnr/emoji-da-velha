import React, { useContext, useState, useRef } from 'react';
import StartStyled from './styles/Start.styled';
import Header from './Header';
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'
import { PlayersContext } from '../App'


const Start: React.FC = () => {
    const {
        player1,
        player2,
        setPlayer1,
        setPlayer2,
        setHasStarted
    } = useContext(PlayersContext)
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const modalElement = useRef<HTMLDivElement>(null);
    const lastClickedID = useRef<string>('');

    const onEmojiSelect = ({ native: emoji }: BaseEmoji) => {
        if (lastClickedID.current === '1') {
            setPlayer1({ ...player1, emoji });
        } else if (lastClickedID.current === '2') {
            setPlayer2({ ...player1, emoji });
        }
        setShowPicker(false);
    }
    const onEmojiClick = (event: React.MouseEvent) => {
        event.preventDefault();
        lastClickedID.current = event.currentTarget.id;
        setShowPicker(true)
    }
    const modalQuit = (event: React.MouseEvent) => {
        if (event.target === modalElement.current) {
            setShowPicker(false);
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const p1length = player1.name.length;
        const p2length = player1.name.length;
        if (p1length === 0) {
            setPlayer1({ ...player1, name: "Jogador 1" });
        } else if (p1length > 10) {
            setPlayer1({ ...player1, name: player1.name.slice(0,9).concat('...') });
        }
        if (p2length === 0) {
            setPlayer2({ ...player2, name: "Jogador 2" });
        } else if (p2length > 10) {
            setPlayer2({ ...player2, name: player2.name.slice(0, 9).concat('...') });
        }
        setHasStarted(true);
    }
    
    return (
        <StartStyled>
            <Header />
            <form id="forms">
                <div className='emojisWrapper'>
                    <button
                        id='1'
                        className='emojiButton'
                        onClick={onEmojiClick}
                    >{player1.emoji}</button>
                    <span>versus</span>
                    <button
                        id='2'
                        className='emojiButton'
                        onClick={onEmojiClick}
                    >{player2.emoji}</button>
                </div>
                <button onClick={handleSubmit} type='submit'>Começar</button>
            </form>
            {showPicker && <div
                className='emojiPickerWrapper'
                ref={modalElement} onClick={modalQuit}>
                <Picker onSelect={onEmojiSelect} native={true} />
            </div>}
        </StartStyled>
    );
};

export default Start;

                // <InputsWrapper
                //     id='1'
                //     onEmojiClick={onEmojiClick}
                //     player={player1}
                //     setPlayer={setPlayer1}
                // />
                // <InputsWrapper
                //     id='2'
                //     onEmojiClick={onEmojiClick}
                //     player={player2}
                //     setPlayer={setPlayer2}
                // />