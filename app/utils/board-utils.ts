import { Chess } from 'chess.js';

export class BoardUtils {
  static isEmptyCell(chess: Chess, position: string): boolean {
    const piece = chess.get(position);
    return piece === null;
  }

  static isPawn(chess: Chess, position: string): boolean {
    const piece = chess.get(position);
    return piece?.type === 'p';
  }

  static isOpponentPiece(chess: Chess, position: string, currentPlayerColor: 'w' | 'b'): boolean {
    const piece = chess.get(position);
    return piece !== null && piece.color !== currentPlayerColor;
  }

  static isOpponentPawn(chess: Chess, position: string, currentPlayerColor: 'w' | 'b'): boolean {
    const piece = chess.get(position);
    return piece?.type === 'p' && piece.color !== currentPlayerColor;
  }
}