import { GridLayout } from '@nativescript/core';
import { Position } from '../../../models/game/types';

export class ChessCell extends GridLayout {
  position: Position;
  isSelected: boolean = false;

  constructor(row: number, col: number) {
    super();
    this.position = { row, col };
    this.className = this.getCellClass();
  }

  private getCellClass(): string {
    const isLight = (this.position.row + this.position.col) % 2 === 0;
    return `chess-cell ${isLight ? 'bg-amber-200' : 'bg-amber-800'}`;
  }

  setSelected(selected: boolean): void {
    this.isSelected = selected;
    this.className = `${this.getCellClass()} ${selected ? 'border-2 border-blue-500' : ''}`;
  }
}