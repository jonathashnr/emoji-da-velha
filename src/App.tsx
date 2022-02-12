import React, { useState } from 'react';
import Start from './components/Start';
import Game from './components/Game';
import GlobalStyles from './components/styles/GlobalStyles';
import AppStyles from './components/styles/App.styled';
import { createContext } from "react";

export interface PlayersContextType {
  emoji1: string;
  emoji2: string;
  setEmoji1: React.Dispatch<React.SetStateAction<string>>
  setEmoji2: React.Dispatch<React.SetStateAction<string>>
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
export const PlayersContext = createContext<PlayersContextType>({} as PlayersContextType);

const App: React.FC = () => {
  const [emoji1, setEmoji1] = useState<string>('😏')
  const [emoji2, setEmoji2] = useState<string>('🙈')
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  return (
    <PlayersContext.Provider
      value={{
        emoji1,
        emoji2,
        setEmoji1,
        setEmoji2,
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
