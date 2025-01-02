import React from 'react';
import { useGameStore } from '../../lib/store/game.store';
import { SpellType } from '../../lib/types';
import { SpellIcon } from './SpellIcon';
import { SPELL_COLORS, SPELL_DESCRIPTIONS } from '../../lib/constants/spells';

export const SpellDeck: React.FC<{ playerId: string }> = ({ playerId }) => {
  const { gameState, selectSpell, selectedSpell } = useGameStore();
  
  // Only show spells if it's this player's turn
  const isCurrentPlayer = (gameState?.currentTurn === 'white' && playerId === 'player1') ||
                         (gameState?.currentTurn === 'black' && playerId === 'player2');
  
  if (!isCurrentPlayer) return null;

  const handleSpellClick = (spell: SpellType) => {
    selectSpell(selectedSpell === spell ? null : spell);
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-800 rounded-lg">
      {gameState?.remainingSpells[playerId]?.map((spell, index) => (
        <button
          key={`${spell}-${index}`}
          className={`
            p-2 rounded-lg flex items-center gap-2 transition-colors
            ${selectedSpell === spell 
              ? `ring-2 ring-${SPELL_COLORS[spell]} bg-gray-700` 
              : 'bg-gray-700 hover:bg-gray-600'}
          `}
          onClick={() => handleSpellClick(spell)}
          title={SPELL_DESCRIPTIONS[spell]}
        >
          <SpellIcon type={spell} size="sm" />
          <span className="text-sm font-medium text-white">
            {spell.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
          </span>
        </button>
      ))}
    </div>
  );
};