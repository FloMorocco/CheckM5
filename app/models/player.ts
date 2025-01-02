export interface Player {
  id: string;
  username: string;
  email: string;
  elo: number;
  spellDeck: string[];
  isPremium: boolean;
}

export interface GameState {
  id: string;
  playerWhite: Player;
  playerBlack: Player;
  fen: string;
  activeSpells: {
    position: string;
    spell: string;
    duration: number;
    ownerId: string;
  }[];
  turn: 'w' | 'b';
  moveHistory: string[];
  remainingSpells: {
    [playerId: string]: string[];
  };
}