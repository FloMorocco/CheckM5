import { Chess } from 'chess.js';
import { GameState } from '../types';
import { SpellManager } from './SpellManager';

export class GameStateManager {
  constructor(
    private chess: Chess,
    private spellManager: SpellManager
  ) {}

  getGameState(currentTurn: 'white' | 'black'): GameState {
    return {
      board: this.chess.fen(),
      activeSpells: this.spellManager.getActiveSpells(),
      currentTurn,
      remainingSpells: {},
      status: 'playing'
    };
  }

  getInitialState(): GameState {
    return {
      board: this.chess.fen(),
      activeSpells: [],
      currentTurn: 'white',
      remainingSpells: {},
      status: 'selecting_spells'
    };
  }
}