import React, { useState } from 'react';
import Start from './components/Start';
import Game from './components/Game';
import GlobalStyles from './components/styles/GlobalStyles';
import AppStyles from './components/styles/App.styled';
import { createContext } from "react";

export interface Player {
  name: string;
  emoji: string;
}
export interface PlayersContextType {
  player1: Player;
  player2: Player;
  setPlayer1: React.Dispatch<React.SetStateAction<Player>>
  setPlayer2: React.Dispatch<React.SetStateAction<Player>>
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PlayersContext = createContext<PlayersContextType>({} as PlayersContextType);

const App: React.FC = () => {
  const [player1, setPlayer1] = useState<Player>({ name: 'Jogador 1', emoji: '❌' })
  const [player2, setPlayer2] = useState<Player>({ name: 'Jogador 2', emoji: '⭕' })
  const [hasStarted, setHasStarted] = useState<boolean>(true);
  return (
    <PlayersContext.Provider
      value={{
        player1,
        player2,
        setPlayer1,
        setPlayer2,
        setHasStarted,
      }}
    >
      <GlobalStyles />
      <AppStyles>
        {hasStarted ? <Game /> : <Start />}
      </AppStyles>
    </PlayersContext.Provider>
  );
}

export default App;
