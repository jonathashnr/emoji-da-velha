export interface PlayersContextType {
  emoji1: string;
  emoji2: string;
  setEmoji1: React.Dispatch<React.SetStateAction<string>>;
  setEmoji2: React.Dispatch<React.SetStateAction<string>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface Board {
  p1: number;
  p2: number;
  d: number;
}
