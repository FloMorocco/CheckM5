import { Chess } from 'chess.js';
import { GameState, Position, SpellType } from '../types';
import { SpellManager } from './SpellManager';
import { MoveValidator } from './MoveValidator';
import { GameStateManager } from './GameStateManager';
import { getValidSpellPositions } from '../utils/spellValidation';

export class GameManager {
  private chess: Chess;
  private spellManager: SpellManager;
  private moveValidator: MoveValidator;
  private gameStateManager: GameStateManager;
  private currentTurn: 'white' | 'black' = 'white';
  private hasMoved: boolean = false;
  private hasCastSpell: boolean = false;

  constructor() {
    this.chess = new Chess();
    this.spellManager = new SpellManager(this.chess);
    this.moveValidator = new MoveValidator(this.chess, this.spellManager);
    this.gameStateManager = new GameStateManager(this.chess, this.spellManager);
  }

  getInitialState(): GameState {
    return this.gameStateManager.getInitialState();
  }

  getGameState(): GameState {
    const isCheck = this.chess.inCheck();
    const isCheckmate = this.chess.isCheckmate();
    
    return {
      ...this.gameStateManager.getGameState(this.currentTurn),
      isCheck,
      winner: isCheckmate ? (this.currentTurn === 'white' ? 'black' : 'white') : undefined,
      status: isCheckmate ? 'finished' : 'playing'
    };
  }

  makeMove(from: Position, to: Position): boolean {
    if (this.hasMoved) return false;

    const success = this.moveValidator.executeMove(from, to);
    if (success) {
      this.hasMoved = true;
      // Only end turn if we've either cast a spell already or no trap was triggered
      const trapTriggered = this.spellManager.checkTrapTrigger(to);
      if (this.hasCastSpell || !trapTriggered) {
        this.endTurn();
      }
      return true;
    }
    return false;
  }

  castSpell(type: SpellType, position: Position, playerId: string): boolean {
    if (this.hasCastSpell) return false;

    const success = this.spellManager.castSpell(type, position, playerId);
    if (success) {
      this.hasCastSpell = true;
      // Only end turn if we've already moved
      if (this.hasMoved) {
        this.endTurn();
      }
      return true;
    }
    return false;
  }

  getValidSpellPositions(type: SpellType): Position[] {
    return getValidSpellPositions(
      this.chess,
      type,
      this.currentTurn,
      (pos) => this.spellManager.hasActiveSpellAt(pos)
    );
  }

  private endTurn(): void {
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    this.hasMoved = false;
    this.hasCastSpell = false;
    this.spellManager.updateSpells(this.currentTurn);
  }
}