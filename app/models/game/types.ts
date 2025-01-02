export interface Position {
  row: number;
  col: number;
}

export interface Piece {
  type: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
  color: 'white' | 'black';
  position: Position;
}

export interface GameState {
  board: string; // FEN notation
  activeSpells: ActiveSpell[];
  currentTurn: 'white' | 'black';
  remainingSpells: {
    [playerId: string]: SpellType[];
  };
}

export type SpellType = 'TORNADO' | 'ICE_CUBE' | 'STEROID' | 'ADAMS_APPLE' | 'WOLFS_TRAP';

export interface ActiveSpell {
  type: SpellType;
  position: Position;
  duration: number;
  ownerId: string;
  isVisible: boolean;
}