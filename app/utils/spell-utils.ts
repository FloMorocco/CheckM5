import { Chess } from 'chess.js';
import { SpellType, SPELLS } from '../models/spell';
import { BoardUtils } from './board-utils';

export class SpellUtils {
  static isSpellValid(chess: Chess, spell: SpellType, position: string, currentPlayerColor: 'w' | 'b'): boolean {
    const spellData = SPELLS[spell];
    if (!spellData) return false;

    switch (spell) {
      case SpellType.TORNADO:
      case SpellType.ICE_CUBE:
      case SpellType.WOLFS_TRAP:
        return BoardUtils.isEmptyCell(chess, position);
      case SpellType.STEROID:
        return BoardUtils.isPawn(chess, position) && !BoardUtils.isOpponentPiece(chess, position, currentPlayerColor);
      case SpellType.ADAMS_APPLE:
        return BoardUtils.isOpponentPawn(chess, position, currentPlayerColor);
      default:
        return false;
    }
  }
}