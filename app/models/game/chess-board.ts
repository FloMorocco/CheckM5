import { Chess } from 'chess.js';
import { Position } from './types';

export class ChessBoard {
  private chess: Chess;

  constructor() {
    this.chess = new Chess();
  }

  isValidMove(from: Position, to: Position): boolean {
    const fromSquare = this.positionToSquare(from);
    const toSquare = this.positionToSquare(to);
    const moves = this.chess.moves({ square: fromSquare, verbose: true });
    return moves.some(move => move.to === toSquare);
  }

  makeMove(from: Position, to: Position): boolean {
    const fromSquare = this.positionToSquare(from);
    const toSquare = this.positionToSquare(to);
    try {
      const move = this.chess.move({ from: fromSquare, to: toSquare });
      return !!move;
    } catch {
      return false;
    }
  }

  getFEN(): string {
    return this.chess.fen();
  }

  private positionToSquare(pos: Position): string {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return files[pos.col] + ranks[pos.row];
  }
}