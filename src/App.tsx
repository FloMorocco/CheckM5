import React from 'react';
import { ChessBoard } from './components/game/ChessBoard';
import { SpellDeck } from './components/game/SpellDeck';
import { SpellSelection } from './components/game/SpellSelection';
import { TurnIndicator } from './components/game/TurnIndicator';
import { CheckIndicator } from './components/game/CheckIndicator';
import { useGameStore } from './lib/store/game.store';

export default function App() {
  const { gameState, initGame } = useGameStore();

  React.useEffect(() => {
    initGame();
  }, [initGame]);

  const handleRestart = () => {
    initGame();
  };

  if (!gameState) {
    return (
      <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-slate-800">Loading game...</div>
      </div>
    );
  }

  if (gameState.status === 'selecting_spells') {
    const needsWhiteSelection = !gameState.players?.white;
    const needsBlackSelection = !gameState.players?.black;

    if (needsWhiteSelection || needsBlackSelection) {
      return (
        <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4">
          <SpellSelection
            playerId={needsWhiteSelection ? 'player1' : 'player2'}
            onSpellsSelected={(spells) => {
              useGameStore.getState().setPlayerSpells(
                needsWhiteSelection ? 'player1' : 'player2',
                spells
              );
              if (!needsWhiteSelection) {
                useGameStore.getState().startGame();
              }
            }}
          />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <CheckIndicator 
        isVisible={!!gameState.isCheck} 
        color={gameState.currentTurn}
      />
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center">
          <TurnIndicator />
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Restart Game
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <ChessBoard />
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <SpellDeck playerId="player1" />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <SpellDeck playerId="player2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}