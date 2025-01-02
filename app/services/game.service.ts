import { Chess } from 'chess.js';
import { GameState, Player } from '../models/player';
import { SpellService } from './spell.service';
import { SpellType } from '../models/spell';
import { ChessUtils } from '../utils/chess-utils';

export class GameService {
  private static instance: GameService;
  private chess: Chess;
  private gameState: GameState;
  private spellService: SpellService;

  private constructor() {
    this.chess = new Chess();
    this.spellService = SpellService.getInstance();
  }

  static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  initializeGame(playerWhite: Player, playerBlack: Player): GameState {
    this.chess.reset();
    
    this.gameState = {
      id: Date.now().toString(),
      playerWhite,
      playerBlack,
      fen: this.chess.fen(),
      activeSpells: [],
      turn: 'w',
      moveHistory: [],
      remainingSpells: {
        [playerWhite.id]: [...playerWhite.spellDeck],
        [playerBlack.id]: [...playerBlack.spellDeck]
      }
    };

    return this.gameState;
  }

  makeMove(from: string, to: string): boolean {
    try {
      if (this.spellService.isMoveBlockedBySpell(this.gameState, from, to)) {
        return false;
      }

      if (!ChessUtils.isValidMove(this.chess, from, to)) {
        return false;
      }

      const move = this.chess.move({ from, to });
      if (move) {
        this.updateGameState(from, to);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Move error:', error);
      return false;
    }
  }

  castSpell(playerId: string, spell: SpellType, position: string): boolean {
    const success = this.spellService.castSpell(this.gameState, playerId, spell, position);
    if (success) {
      this.spellService.updateChessState(this.gameState.fen);
    }
    return success;
  }

  private updateGameState(from: string, to: string): void {
    this.gameState.fen = this.chess.fen();
    this.gameState.moveHistory.push(`${from}-${to}`);
    this.gameState.turn = this.chess.turn();
    this.spellService.updateSpellDurations(this.gameState);
    this.spellService.updateChessState(this.gameState.fen);
  }

  getPossibleMoves(square: string): string[] {
    return ChessUtils.getPossibleMoves(this.chess, square);
  }

  getGameState(): GameState {
    return this.gameState;
  }
}