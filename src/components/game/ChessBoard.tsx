import React from 'react';
import { useGameStore } from '../../lib/store/game.store';
import { Position } from '../../lib/types';
import { fenToBoard, getPieceImage } from '../../lib/utils/chess';
import { SpellIcon } from './SpellIcon';
import { SPELL_COLORS } from '../../lib/constants/spells';

export const ChessBoard: React.FC = () => {
  const { gameState, makeMove, castSpell, selectedSpell, gameManager } = useGameStore();
  const [selectedPosition, setSelectedPosition] = React.useState<Position | null>(null);
  const [validPositions, setValidPositions] = React.useState<Position[]>([]);

  React.useEffect(() => {
    if (selectedSpell && gameManager) {
      setValidPositions(gameManager.getValidSpellPositions(selectedSpell));
      setSelectedPosition(null);
    } else {
      setValidPositions([]);
    }
  }, [selectedSpell, gameManager]);

  const board = gameState ? fenToBoard(gameState.board) : Array(8).fill(null).map(() => Array(8).fill(null));

  const handleCellClick = (position: Position) => {
    if (selectedSpell) {
      if (isValidSpellPosition(position)) {
        castSpell(position);
      }
    } else if (!selectedPosition) {
      setSelectedPosition(position);
    } else {
      makeMove(selectedPosition, position);
      setSelectedPosition(null);
    }
  };

  const isValidSpellPosition = (position: Position): boolean => {
    return validPositions.some(p => p.row === position.row && p.col === position.col);
  };

  return (
    <div className="grid grid-cols-8 gap-0 w-full max-w-2xl aspect-square bg-amber-800">
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected = selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;
          const activeSpell = gameState?.activeSpells.find(
            spell => spell.position.row === rowIndex && spell.position.col === colIndex
          );
          const isValidPosition = isValidSpellPosition({ row: rowIndex, col: colIndex });
          
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                aspect-square cursor-pointer relative transition-all
                ${isLight ? 'bg-amber-200' : 'bg-amber-800'}
                ${isSelected ? 'ring-2 ring-blue-500' : ''}
                ${selectedSpell && isValidPosition ? 'ring-2 ring-purple-500' : ''}
                ${activeSpell ? `ring-2 ring-${SPELL_COLORS[activeSpell.type]}` : ''}
                hover:brightness-110
              `}
              onClick={() => handleCellClick({ row: rowIndex, col: colIndex })}
            >
              {piece && (
                <img
                  src={getPieceImage(piece)}
                  alt={piece}
                  className="absolute inset-0 w-full h-full p-1 select-none"
                  draggable={false}
                />
              )}
              {activeSpell && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-${SPELL_COLORS[activeSpell.type]} opacity-20`} />
                  <SpellIcon type={activeSpell.type} size="md" />
                </div>
              )}
              {selectedSpell && isValidPosition && (
                <div className="absolute inset-0 bg-purple-500 opacity-20" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};