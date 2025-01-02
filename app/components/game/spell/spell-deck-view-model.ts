import { Observable } from '@nativescript/core';
import { SpellType } from '../../../models/game/types';

export class SpellDeckViewModel extends Observable {
  spells: { type: SpellType; name: string; index: number }[] = [];

  constructor(deck: SpellType[]) {
    super();
    this.spells = deck.map((type, index) => ({
      type,
      name: this.getSpellName(type),
      index
    }));
  }

  onSpellTap(args: any): void {
    const spell = this.spells[args.object.col];
    // TODO: Implement spell casting logic
  }

  private getSpellName(type: SpellType): string {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
}