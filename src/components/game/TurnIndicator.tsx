import React from 'react';
import { useGameStore } from '../../lib/store/game.store';

export const TurnIndicator: React.FC = () => {
  const { gameState } = useGameStore();
  const [moveTime, setMoveTime] = React.useState(0);

  React.useEffect(() => {
    if (gameState?.status !== 'playing') return;

    const interval = setInterval(() => {
      setMoveTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState?.currentTurn, gameState?.status]);

  React.useEffect(() => {
    setMoveTime(0);
  }, [gameState?.currentTurn]);

  if (gameState?.status !== 'playing') return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">
        {gameState.currentTurn === 'white' ? 'White' : 'Black'}'s Turn
      </h2>
      <p className="text-gray-600">
        Move time: {formatTime(moveTime)}
      </p>
    </div>
  );
};