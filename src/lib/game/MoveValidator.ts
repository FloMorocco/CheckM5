import { Chess } from 'chess.js';
import { Position } from '../types';
import { SpellManager } from './SpellManager';
import { positionToSquare } from '../utils/chess';

export class MoveValidator {
  constructor(
    private chess: Chess,
    private spellManager: SpellManager
  ) {}

  executeMove(from: Position, to: Position): boolean {
    const fromSquare = positionToSquare(from);
    const toSquare = positionToSquare(to);

    if (this.spellManager.isMoveBlocked(from, to)) {
      return false;
    }

    const piece = this.chess.get(fromSquare);
    if (!piece) return false;

    if (piece.type === 'p' && this.spellManager.hasSpellEffect('STEROID', from)) {
      return this.executeSteroidPawnMove(from, to, piece.color);
    }

    return this.executeRegularMove(fromSquare, toSquare);
  }

  private executeSteroidPawnMove(from: Position, to: Position, color: 'w' | 'b'): boolean {
    if (!this.isValidSteroidPawnMove(from, to)) {
      return false;
    }

    const fromSquare = positionToSquare(from);
    const toSquare = positionToSquare(to);

    this.chess.remove(fromSquare);
    this.chess.put({ type: 'p', color }, toSquare);
    
    return !this.spellManager.checkTrapTrigger(to);
  }

  private executeRegularMove(fromSquare: string, toSquare: string): boolean {
    try {
      const move = this.chess.move({ from: fromSquare, to: toSquare });
      if (!move) return false;

      return !this.spellManager.checkTrapTrigger({ 
        row: 8 - parseInt(toSquare[1]), 
        col: toSquare.charCodeAt(0) - 97 
      });
    } catch {
      return false;
    }
  }

  private isValidSteroidPawnMove(from: Position, to: Position): boolean {
    const piece = this.chess.get(positionToSquare(from));
    if (!piece || piece.type !== 'p') return false;

    const direction = piece.color === 'w' ? -1 : 1;
    const rowDiff = to.row - from.row;
    const colDiff = Math.abs(to.col - from.col);

    if (colDiff === 0 && rowDiff * direction > 0 && Math.abs(rowDiff) <= 3) {
      for (let i = 1; i < Math.abs(rowDiff); i++) {
        const checkRow = from.row + (i * Math.sign(rowDiff));
        if (this.chess.get(positionToSquare({ row: checkRow, col: from.col }))) {
          return false;
        }
      }
      return !this.chess.get(positionToSquare(to));
    }

    if (colDiff === 1 && Math.abs(rowDiff) === 1) {
      const destPiece = this.chess.get(positionToSquare(to));
      return !!destPiece && destPiece.color !== piece.color;
    }

    return false;
  }
}