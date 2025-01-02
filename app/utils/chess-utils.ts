import { Chess, Move } from 'chess.js';

export class ChessUtils {
  static isValidMove(chess: Chess, from: string, to: string): boolean {
    try {
      const moves = chess.moves({ square: from, verbose: true }) as Move[];
      return moves.some(move => move.to === to);
    } catch (error) {
      console.error('Error checking move validity:', error);
      return false;
    }
  }

  static getPossibleMoves(chess: Chess, square: string): string[] {
    try {
      const moves = chess.moves({ square, verbose: true }) as Move[];
      return moves.map(move => move.to);
    } catch (error) {
      console.error('Error getting possible moves:', error);
      return [];
    }
  }
}