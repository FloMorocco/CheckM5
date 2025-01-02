import { Chess } from 'chess.js';
import { ActiveSpell, Position, SpellType } from '../types';
import { isValidSpellTarget } from '../utils/spellValidation';
import { moveAdamsApplePawn, getAdjacentEmptyCells } from '../utils/spellEffects';
import { positionToSquare } from '../utils/chess';

export class SpellManager {
  private activeSpells: ActiveSpell[] = [];
  private trappedPieces: Map<string, number> = new Map();
  private steroidPieces: Map<string, number> = new Map();

  constructor(private chess: Chess) {}

  getActiveSpells(): ActiveSpell[] {
    return [...this.activeSpells];
  }

  hasActiveSpellAt(position: Position): boolean {
    return this.activeSpells.some(spell => 
      spell.position.row === position.row && 
      spell.position.col === position.col
    );
  }

  castSpell(type: SpellType, position: Position, playerId: string): boolean {
    if (!isValidSpellTarget(this.chess, type, position, pos => this.hasActiveSpellAt(pos))) {
      return false;
    }

    if (type === 'ADAMS_APPLE') {
      return moveAdamsApplePawn(this.chess, position);
    }

    if (type === 'STEROID') {
      const square = positionToSquare(position);
      this.steroidPieces.set(square, 2); // Lasts 2 turns
      return true;
    }

    this.activeSpells.push({
      type,
      position,
      duration: this.getSpellDuration(type),
      ownerId: playerId
    });

    return true;
  }

  hasSpellEffect(type: SpellType, position: Position): boolean {
    const square = positionToSquare(position);
    if (type === 'STEROID') {
      return this.steroidPieces.has(square);
    }
    return this.activeSpells.some(spell => 
      spell.type === type &&
      spell.position.row === position.row &&
      spell.position.col === position.col
    );
  }

  isMoveBlocked(from: Position, to: Position): boolean {
    const fromSquare = positionToSquare(from);
    if (this.trappedPieces.has(fromSquare)) {
      return true;
    }

    return this.activeSpells.some(spell => 
      spell.position.row === to.row && 
      spell.position.col === to.col &&
      (spell.type === 'ICE_CUBE' || spell.type === 'TORNADO')
    );
  }

  checkTrapTrigger(to: Position): boolean {
    const toSquare = positionToSquare(to);
    const trap = this.activeSpells.find(spell => 
      spell.type === 'WOLFS_TRAP' &&
      spell.position.row === to.row &&
      spell.position.col === to.col
    );

    if (trap) {
      this.trappedPieces.set(toSquare, 2); // Trap lasts 2 turns
      this.activeSpells = this.activeSpells.filter(spell => spell !== trap);
      return true;
    }

    return false;
  }

  updateSpells(nextTurn: 'white' | 'black'): void {
    // Update trapped pieces
    for (const [square, turnsLeft] of this.trappedPieces.entries()) {
      if (turnsLeft > 1) {
        this.trappedPieces.set(square, turnsLeft - 1);
      } else {
        this.trappedPieces.delete(square);
      }
    }

    // Update steroid effects
    for (const [square, turnsLeft] of this.steroidPieces.entries()) {
      if (turnsLeft > 1) {
        this.steroidPieces.set(square, turnsLeft - 1);
      } else {
        this.steroidPieces.delete(square);
      }
    }

    // Move tornados
    this.activeSpells = this.activeSpells.map(spell => {
      if (spell.type === 'TORNADO') {
        const emptyCells = getAdjacentEmptyCells(this.chess, spell.position);
        if (emptyCells.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          return { ...spell, position: emptyCells[randomIndex] };
        }
      }
      return spell;
    });

    // Update durations
    this.activeSpells = this.activeSpells
      .map(spell => ({ ...spell, duration: spell.duration - 1 }))
      .filter(spell => spell.duration > 0);
  }

  private getSpellDuration(type: SpellType): number {
    const durations: Record<SpellType, number> = {
      TORNADO: 3,
      ICE_CUBE: 2,
      STEROID: 2,
      ADAMS_APPLE: 1,
      WOLFS_TRAP: 2
    };
    return durations[type];
  }
}