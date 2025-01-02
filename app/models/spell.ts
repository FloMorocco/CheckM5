export enum SpellType {
  TORNADO = 'TORNADO',
  ICE_CUBE = 'ICE_CUBE',
  STEROID = 'STEROID',
  ADAMS_APPLE = 'ADAMS_APPLE',
  WOLFS_TRAP = 'WOLFS_TRAP'
}

export interface Spell {
  type: SpellType;
  duration: number;
  description: string;
  isVisible: boolean;
}

export const SPELLS: Record<SpellType, Spell> = {
  [SpellType.TORNADO]: {
    type: SpellType.TORNADO,
    duration: 3,
    description: 'Moves randomly to adjacent cells, blocking piece placement',
    isVisible: true
  },
  [SpellType.ICE_CUBE]: {
    type: SpellType.ICE_CUBE,
    duration: 2,
    description: 'Blocks any piece movement through its cell',
    isVisible: true
  },
  [SpellType.STEROID]: {
    type: SpellType.STEROID,
    duration: 1,
    description: 'Increases pawn movement range by 1',
    isVisible: true
  },
  [SpellType.ADAMS_APPLE]: {
    type: SpellType.ADAMS_APPLE,
    duration: 1,
    description: 'Forces a pawn to move forward one cell',
    isVisible: true
  },
  [SpellType.WOLFS_TRAP]: {
    type: SpellType.WOLFS_TRAP,
    duration: 2,
    description: 'Hidden trap that blocks pieces for 2 turns',
    isVisible: false
  }
};