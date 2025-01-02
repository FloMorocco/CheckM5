import React from 'react';
import { useGameStore } from '../../lib/store/game.store';

export const GameInfo: React.FC = () => {
  const { gameState } = useGameStore();
  const [elapsedTime, setElapsedTime] = React.useState({ white: 0, black: 0 });
  const [currentPlayerTime, setCurrentPlayerTime] = React.useState(0);

  React.useEffect(() => {
    if (gameState?.status !== 'playing') return;

    const interval = setInterval(() => {
      setElapsedTime(prev => ({
        ...prev,
        [gameState.currentTurn]: prev[gameState.currentTurn as keyof typeof prev] + 1
      }));
      setCurrentPlayerTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState?.currentTurn, gameState?.status]);

  React.useEffect(() => {
    setCurrentPlayerTime(0);
  }, [gameState?.currentTurn]);

  if (gameState?.status !== 'playing') return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold mb-2">
            Current Turn: {gameState.currentTurn === 'white' ? 'White' : 'Black'}
          </h2>
          <p className="text-gray-600">
            Current move time: {formatTime(currentPlayerTime)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">
            White total time: {formatTime(elapsedTime.white)}
          </p>
          <p className="text-gray-600">
            Black total time: {formatTime(elapsedTime.black)}
          </p>
        </div>
      </div>
    </div>
  );
};