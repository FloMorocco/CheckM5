import { SpellType, Position, ActiveSpell, GameState } from './types';
import { ChessBoard } from './chess-board';

export class SpellManager {
  private activeSpells: ActiveSpell[] = [];
  private chessBoard: ChessBoard;

  constructor(chessBoard: ChessBoard) {
    this.chessBoard = chessBoard;
  }

  castSpell(type: SpellType, position: Position, playerId: string): boolean {
    if (!this.isValidSpellTarget(type, position)) {
      return false;
    }

    const spell: ActiveSpell = {
      type,
      position,
      duration: this.getSpellDuration(type),
      ownerId: playerId,
      isVisible: type !== 'WOLFS_TRAP'
    };

    this.activeSpells.push(spell);
    return true;
  }

  private getSpellDuration(type: SpellType): number {
    const durations: Record<SpellType, number> = {
      TORNADO: 3,
      ICE_CUBE: 2,
      STEROID: 1,
      ADAMS_APPLE: 1,
      WOLFS_TRAP: 2
    };
    return durations[type];
  }

  private isValidSpellTarget(type: SpellType, position: Position): boolean {
    // Implement spell-specific validation logic
    return true;
  }

  updateSpells(): void {
    this.activeSpells = this.activeSpells
      .map(spell => ({ ...spell, duration: spell.duration - 1 }))
      .filter(spell => spell.duration > 0);
  }

  getActiveSpells(): ActiveSpell[] {
    return [...this.activeSpells];
  }
}