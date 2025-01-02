import { SpellType } from '../types';

export const SPELL_ICONS: Record<SpellType, string> = {
  ADAMS_APPLE: '/assets/spells/adams_apple.png',
  ICE_CUBE: '/assets/spells/ice_cube.png',
  STEROID: '/assets/spells/potion.png',
  TORNADO: '/assets/spells/tornado.png',
  WOLFS_TRAP: '/assets/spells/trap.png'
};

export const SPELL_COLORS: Record<SpellType, string> = {
  ADAMS_APPLE: 'red-500',
  ICE_CUBE: 'cyan-400',
  STEROID: 'green-500',
  TORNADO: 'gray-500',
  WOLFS_TRAP: 'yellow-500'
};

export const SPELL_DESCRIPTIONS: Record<SpellType, string> = {
  ADAMS_APPLE: 'Forces a pawn to move forward one cell',
  ICE_CUBE: 'Blocks any piece movement through its cell',
  STEROID: 'Increases pawn movement range by 1',
  TORNADO: 'Moves randomly to adjacent cells, blocking piece placement',
  WOLFS_TRAP: 'Hidden trap that blocks pieces for 2 turns'
};