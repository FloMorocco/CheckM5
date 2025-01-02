import { Chess } from 'chess.js';
import { Position } from '../types';
import { positionToSquare } from './chess';

export function moveAdamsApplePawn(chess: Chess, position: Position): boolean {
  const square = positionToSquare(position);
  const piece = chess.get(square);
  
  if (!piece || piece.type !== 'p') return false;

  const direction = piece.color === 'w' ? -1 : 1;
  const newPosition = {
    row: position.row + direction,
    col: position.col
  };

  if (newPosition.row < 0 || newPosition.row > 7) return false;

  const newSquare = positionToSquare(newPosition);
  if (chess.get(newSquare)) return false;

  chess.remove(square);
  chess.put({ type: 'p', color: piece.color }, newSquare);
  return true;
}

export function getAdjacentEmptyCells(chess: Chess, position: Position): Position[] {
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  return directions
    .map(([dr, dc]) => ({
      row: position.row + dr,
      col: position.col + dc
    }))
    .filter(pos => 
      pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8 &&
      !chess.get(positionToSquare(pos))
    );
}