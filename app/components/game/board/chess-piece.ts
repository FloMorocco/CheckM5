import { Image } from '@nativescript/core';
import { Piece } from '../../../models/game/types';

export class ChessPiece extends Image {
  piece: Piece;

  constructor(piece: Piece) {
    super();
    this.piece = piece;
    this.src = this.getPieceImage();
    this.className = 'w-full h-full p-1';
  }

  private getPieceImage(): string {
    const color = this.piece.color;
    const type = this.piece.type;
    return `~/assets/pieces/${color}_${type}.png`;
  }
}