export type SpellType = 'TORNADO' | 'ICE_CUBE' | 'STEROID' | 'ADAMS_APPLE' | 'WOLFS_TRAP';

export interface Position {
  row: number;
  col: number;
}

export interface Player {
  id: string;
  selectedSpells: SpellType[];
}

export interface ActiveSpell {
  type: SpellType;
  position: Position;
  duration: number;
  ownerId: string;
}

export interface GameState {
  board: string;
  activeSpells: ActiveSpell[];
  currentTurn: 'white' | 'black';
  remainingSpells: {
    [playerId: string]: SpellType[];
  };
  players?: {
    white: Player;
    black: Player;
  };
  status: 'selecting_spells' | 'playing' | 'finished';
  isCheck?: boolean;
  winner?: 'white' | 'black';
}