import { ChessBoard } from './chess-board';
import { SpellManager } from './spell-manager';
import { GameState, Position, SpellType } from './types';

export class GameManager {
  private chessBoard: ChessBoard;
  private spellManager: SpellManager;
  private currentTurn: 'white' | 'black' = 'white';

  constructor() {
    this.chessBoard = new ChessBoard();
    this.spellManager = new SpellManager(this.chessBoard);
  }

  makeMove(from: Position, to: Position): boolean {
    if (this.spellManager.getActiveSpells().some(spell => 
      this.isSamePosition(spell.position, from) || 
      this.isSamePosition(spell.position, to)
    )) {
      return false;
    }

    const moveSuccess = this.chessBoard.makeMove(from, to);
    if (moveSuccess) {
      this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
      this.spellManager.updateSpells();
    }
    return moveSuccess;
  }

  castSpell(type: SpellType, position: Position, playerId: string): boolean {
    return this.spellManager.castSpell(type, position, playerId);
  }

  private isSamePosition(a: Position, b: Position): boolean {
    return a.row === b.row && a.col === b.col;
  }

  getGameState(): GameState {
    return {
      board: this.chessBoard.getFEN(),
      activeSpells: this.spellManager.getActiveSpells(),
      currentTurn: this.currentTurn,
      remainingSpells: {} // To be implemented with player management
    };
  }
}