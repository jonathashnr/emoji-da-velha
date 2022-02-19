import React, { useMemo, useState } from "react";
import Start from "./components/Start";
import Game from "./components/Game";
import GlobalStyles from "./components/styles/GlobalStyles";
import AppStyles from "./components/styles/App.styled";
import PlayersContext from "./PlayersContext";

function App() {
  const [emoji1, setEmoji1] = useState<string>("😏");
  const [emoji2, setEmoji2] = useState<string>("🙈");
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const context = useMemo(
    () => ({ emoji1, emoji2, setEmoji1, setEmoji2, setHasStarted }),
    [emoji1, emoji2]
  );
  return (
    <PlayersContext.Provider value={context}>
      <GlobalStyles />
      <AppStyles>{hasStarted ? <Game /> : <Start />}</AppStyles>
    </PlayersContext.Provider>
  );
}

export default App;
