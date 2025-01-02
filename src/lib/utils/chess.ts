import { Position } from '../types';

export function fenToBoard(fen: string): (string | null)[][] {
  const board: (string | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  const [position] = fen.split(' ');
  const rows = position.split('/');

  rows.forEach((row, rowIndex) => {
    let colIndex = 0;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (/\d/.test(char)) {
        colIndex += parseInt(char);
      } else {
        board[rowIndex][colIndex] = char;
        colIndex++;
      }
    }
  });

  return board;
}

export function getPieceImage(piece: string): string {
  const color = piece.toLowerCase() === piece ? 'b' : 'w';
  const type = piece.toLowerCase();
  return `/assets/pieces/${color}_${type}.png`;
}

export function positionToSquare(pos: Position): string {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  return files[pos.col] + ranks[pos.row];
}

export function squareToPosition(square: string): Position {
  return {
    row: 8 - parseInt(square[1]),
    col: square.charCodeAt(0) - 97
  };
}