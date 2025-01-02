export interface Player {
  id: string;
  username: string;
  email: string;
  elo: number;
  spellDeck: string[];
  isPremium: boolean;
}

export interface PlayerStats {
  wins: number;
  losses: number;
  draws: number;
  eloHistory: { date: string; elo: number }[];
}