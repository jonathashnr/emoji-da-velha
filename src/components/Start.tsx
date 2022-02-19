import React, { useContext, useState, useRef } from "react";
import { BaseEmoji, Picker } from "emoji-mart";
import StartStyled from "./styles/Start.styled";
import Header from "./Header";
import "emoji-mart/css/emoji-mart.css";
import PlayersContext from "../PlayersContext";

function Start() {
  const { emoji1, emoji2, setEmoji1, setEmoji2, setHasStarted } =
    useContext(PlayersContext);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const modalElement = useRef<HTMLDivElement>(null);
  const lastClickedID = useRef<string>("");

  const onEmojiSelect = ({ native: emoji }: BaseEmoji) => {
    if (lastClickedID.current === "emo1button") {
      setEmoji1(emoji);
    } else if (lastClickedID.current === "emo2button") {
      setEmoji2(emoji);
    }
    setShowPicker(false);
  };
  const onEmojiClick = (event: React.MouseEvent) => {
    event.preventDefault();
    lastClickedID.current = event.currentTarget.id;
    setShowPicker(true);
  };
  const modalQuit = (event: React.MouseEvent) => {
    if (event.target === modalElement.current) {
      setShowPicker(false);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setHasStarted(true);
  };

  return (
    <StartStyled>
      <Header />
      <p>
        Bem-vindo ao Emoji da Velha, um jogo da velha com emojis. Para jogar
        basta clicar no botão <strong>Começar</strong>. Você também pode{" "}
        <strong>trocar</strong> os emojis clicando neles.
      </p>
      <form id="forms">
        <div className="emojis-wrapper">
          <button
            type="button"
            id="emo1button"
            className="emoji-button"
            onClick={onEmojiClick}
          >
            {emoji1}
          </button>
          <span>versus</span>
          <button
            type="button"
            id="emo2button"
            className="emoji-button"
            onClick={onEmojiClick}
          >
            {emoji2}
          </button>
        </div>
        <button id="start-button" onClick={handleSubmit} type="submit">
          Começar
        </button>
      </form>
      <a
        id="github"
        rel="noreferrer"
        href="https://github.com/jonathashnr/emoji-da-velha"
        target="_blank"
      >
        Github Repo
      </a>
      {showPicker && (
        <div
          className="emoji-picker-wrapper"
          ref={modalElement}
          onClick={modalQuit}
          aria-hidden
        >
          <Picker onSelect={onEmojiSelect} native />
        </div>
      )}
    </StartStyled>
  );
}

export default Start;
