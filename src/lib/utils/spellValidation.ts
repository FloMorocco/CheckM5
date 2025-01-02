import { Chess } from 'chess.js';
import { Position, SpellType } from '../types';
import { positionToSquare } from './chess';
import { fenToBoard } from './chess';

export function isValidSpellTarget(
  chess: Chess,
  type: SpellType,
  position: Position,
  hasActiveSpellAt: (position: Position) => boolean
): boolean {
  const square = positionToSquare(position);
  const piece = chess.get(square);

  // Check if position already has a spell
  if (hasActiveSpellAt(position)) {
    return false;
  }

  switch (type) {
    case 'STEROID':
      return piece?.type === 'p';
    case 'ADAMS_APPLE':
      return piece?.type === 'p';
    case 'ICE_CUBE':
    case 'TORNADO':
    case 'WOLFS_TRAP':
      return !piece;
    default:
      return false;
  }
}

export function getValidSpellPositions(
  chess: Chess,
  type: SpellType,
  currentTurn: 'white' | 'black',
  hasActiveSpellAt: (position: Position) => boolean
): Position[] {
  const board = fenToBoard(chess.fen());
  const positions: Position[] = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const position = { row, col };
      const piece = board[row][col];
      
      if (hasActiveSpellAt(position)) {
        continue;
      }

      switch (type) {
        case 'STEROID':
          if (piece === (currentTurn === 'white' ? 'P' : 'p')) {
            positions.push(position);
          }
          break;
        case 'ADAMS_APPLE':
          if (piece === (currentTurn === 'white' ? 'p' : 'P')) {
            positions.push(position);
          }
          break;
        case 'ICE_CUBE':
        case 'TORNADO':
        case 'WOLFS_TRAP':
          if (!piece) {
            positions.push(position);
          }
          break;
      }
    }
  }

  return positions;
}