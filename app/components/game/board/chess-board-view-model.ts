import { Observable } from '@nativescript/core';
import { GameManager } from '../../../models/game/game-manager';
import { Position, Piece, GameState } from '../../../models/game/types';

export class ChessBoardViewModel extends Observable {
  private gameManager: GameManager;
  private selectedPosition: Position | null = null;
  private validMoves: Position[] = [];

  constructor() {
    super();
    this.gameManager = new GameManager();
    this.initializeBoard();
  }

  private initializeBoard(): void {
    const gameState = this.gameManager.getGameState();
    this.updateBoard(gameState);
  }

  onCellTap(args: any): void {
    const position: Position = {
      row: args.object.row,
      col: args.object.col
    };

    if (this.selectedPosition) {
      if (this.isValidMove(position)) {
        this.makeMove(this.selectedPosition, position);
      }
      this.clearSelection();
    } else {
      this.selectPosition(position);
    }
  }

  private selectPosition(position: Position): void {
    this.selectedPosition = position;
    // Calculate valid moves for the selected piece
    this.validMoves = []; // TODO: Get valid moves from GameManager
    this.notifyPropertyChange('cells', this.getCells());
  }

  private makeMove(from: Position, to: Position): void {
    const success = this.gameManager.makeMove(from, to);
    if (success) {
      const gameState = this.gameManager.getGameState();
      this.updateBoard(gameState);
    }
  }

  private clearSelection(): void {
    this.selectedPosition = null;
    this.validMoves = [];
    this.notifyPropertyChange('cells', this.getCells());
  }

  private updateBoard(gameState: GameState): void {
    // Update the board state based on FEN and active spells
    this.notifyPropertyChange('cells', this.getCells());
  }

  private isValidMove(position: Position): boolean {
    return this.validMoves.some(move => 
      move.row === position.row && move.col === position.col
    );
  }

  getCells(): any[] {
    // Generate cell data for the template
    return []; // TODO: Implement cell data generation
  }
}