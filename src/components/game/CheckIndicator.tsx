import React from 'react';

interface Props {
  isVisible: boolean;
  color: 'white' | 'black';
}

export const CheckIndicator: React.FC<Props> = ({ isVisible, color }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-fade-in">
      <div className="bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg text-3xl font-bold">
        {color === 'white' ? 'White' : 'Black'} is in Check!
      </div>
    </div>
  );
};