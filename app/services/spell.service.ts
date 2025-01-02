import { Chess } from 'chess.js';
import { SpellType, SPELLS } from '../models/spell';
import { GameState } from '../models/player';
import { SpellUtils } from '../utils/spell-utils';

export class SpellService {
  private static instance: SpellService;
  private chess: Chess;

  private constructor() {
    this.chess = new Chess();
  }

  static getInstance(): SpellService {
    if (!SpellService.instance) {
      SpellService.instance = new SpellService();
    }
    return SpellService.instance;
  }

  castSpell(gameState: GameState, playerId: string, spell: SpellType, position: string): boolean {
    const spells = gameState.remainingSpells[playerId];
    if (!spells.includes(spell)) {
      return false;
    }

    const currentPlayerColor = gameState.turn;
    if (!SpellUtils.isSpellValid(this.chess, spell, position, currentPlayerColor)) {
      return false;
    }

    const spellData = SPELLS[spell];
    gameState.activeSpells.push({
      position,
      spell,
      duration: spellData.duration,
      ownerId: playerId
    });

    gameState.remainingSpells[playerId] = spells.filter(s => s !== spell);
    return true;
  }

  updateSpellDurations(gameState: GameState): void {
    gameState.activeSpells = gameState.activeSpells
      .map(spell => ({
        ...spell,
        duration: spell.duration - 1
      }))
      .filter(spell => spell.duration > 0);
  }

  isMoveBlockedBySpell(gameState: GameState, from: string, to: string): boolean {
    return gameState.activeSpells.some(spell => 
      spell.position === to || spell.position === from
    );
  }

  updateChessState(fen: string): void {
    this.chess.load(fen);
  }
}