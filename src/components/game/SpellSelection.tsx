import React from 'react';
import { SpellType } from '../../lib/types';
import { SpellIcon } from './SpellIcon';
import { SPELL_DESCRIPTIONS } from '../../lib/constants/spells';
import { Banner } from './Banner';

const AVAILABLE_SPELLS: { type: SpellType; description: string }[] = [
  { type: 'TORNADO', description: SPELL_DESCRIPTIONS.TORNADO },
  { type: 'ICE_CUBE', description: SPELL_DESCRIPTIONS.ICE_CUBE },
  { type: 'STEROID', description: SPELL_DESCRIPTIONS.STEROID },
  { type: 'ADAMS_APPLE', description: SPELL_DESCRIPTIONS.ADAMS_APPLE },
  { type: 'WOLFS_TRAP', description: SPELL_DESCRIPTIONS.WOLFS_TRAP },
];

interface Props {
  playerId: string;
  onSpellsSelected: (spells: SpellType[]) => void;
}

export const SpellSelection: React.FC<Props> = ({ playerId, onSpellsSelected }) => {
  const [selectedSpells, setSelectedSpells] = React.useState<SpellType[]>([]);
  const isPlayer2 = playerId === 'player2';

  // Reset selectedSpells when playerId changes
  React.useEffect(() => {
    setSelectedSpells([]);
  }, [playerId]);

  const handleSpellClick = (spell: SpellType) => {
    if (selectedSpells.includes(spell)) {
      setSelectedSpells(selectedSpells.filter(s => s !== spell));
    } else if (selectedSpells.length < 3) {
      setSelectedSpells([...selectedSpells, spell]);
    }
  };

  const handleConfirm = () => {
    if (selectedSpells.length === 3) {
      onSpellsSelected(selectedSpells);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md">
      <Banner />
      
      <h2 className="text-xl font-bold mb-4 text-center">
        {isPlayer2 ? "Black Player's Spells" : "White Player's Spells"}
      </h2>

      {/* Selected spells */}
      <div className="mb-4 flex gap-2">
        {Array(3).fill(null).map((_, index) => (
          <div 
            key={index} 
            className={`w-1/3 h-16 rounded border-2 ${
              selectedSpells[index] 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-dashed border-gray-300'
            } flex items-center justify-center relative`}
          >
            {selectedSpells[index] && (
              <>
                <SpellIcon type={selectedSpells[index]} size="lg" />
                <button
                  onClick={() => setSelectedSpells(selectedSpells.filter((_, i) => i !== index))}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Available spells */}
      <div className="space-y-4">
        {AVAILABLE_SPELLS.map(({ type, description }) => (
          <button
            key={type}
            onClick={() => handleSpellClick(type)}
            className={`w-full p-4 rounded-lg text-left transition flex items-center gap-4 ${
              selectedSpells.includes(type)
                ? 'bg-indigo-50 border-2 border-indigo-500'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            disabled={selectedSpells.length >= 3 && !selectedSpells.includes(type)}
          >
            <SpellIcon type={type} size="lg" />
            <div>
              <div className="font-semibold">{type.split('_').map(word => 
                word.charAt(0) + word.slice(1).toLowerCase()
              ).join(' ')}</div>
              <div className="text-sm text-gray-600">{description}</div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        disabled={selectedSpells.length !== 3}
        className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg disabled:bg-gray-400 transition"
      >
        Confirm Selection ({selectedSpells.length}/3)
      </button>
    </div>
  );
};