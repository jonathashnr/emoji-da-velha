import { createContext } from "react";
import { PlayersContextType } from "./Types";

const PlayersContext = createContext<PlayersContextType>(
  {} as PlayersContextType
);

export default PlayersContext;
