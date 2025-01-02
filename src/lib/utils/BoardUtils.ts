export class BoardUtils {
  static getBoardFromFen(fen: string): (string | null)[][] {
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
}