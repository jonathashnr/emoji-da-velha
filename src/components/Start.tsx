import React, { useContext, useState, useRef } from 'react';
import StartStyled from './styles/Start.styled';
import Header from './Header';
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'
import { PlayersContext } from '../App'


const Start: React.FC = () => {
    const {
        emoji1,
        emoji2,
        setEmoji1,
        setEmoji2,
        setHasStarted
    } = useContext(PlayersContext)
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const modalElement = useRef<HTMLDivElement>(null);
    const lastClickedID = useRef<string>('');

    const onEmojiSelect = ({ native: emoji }: BaseEmoji) => {
        if (lastClickedID.current === 'emo1button') {
            setEmoji1(emoji);
        } else if (lastClickedID.current === 'emo2button') {
            setEmoji2(emoji);
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
        setHasStarted(true);
    }
    
    return (
        <StartStyled>
            <Header />
            <p>Bem-vindo ao Emoji da Velha, um jogo da velha com emojis. Para jogar basta clicar no botão <strong>Começar</strong>. Você também pode <strong>trocar</strong> os emojis clicando neles.</p>
            <form id="forms">
                <div className='emojisWrapper'>
                    <div
                        id='emo1button'
                        className='emojiButton'
                        onClick={onEmojiClick}
                    >{emoji1}</div>
                    <span>versus</span>
                    <div
                        id='emo2button'
                        className='emojiButton'
                        onClick={onEmojiClick}
                    >{emoji2}</div>
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