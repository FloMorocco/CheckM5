import React from 'react';
import { SpellType } from '../../lib/types';
import { SPELL_ICONS } from '../../lib/constants/spells';

interface SpellIconProps {
  type: SpellType;
  size?: 'sm' | 'md' | 'lg';
}

export const SpellIcon: React.FC<SpellIconProps> = ({ type, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const [error, setError] = React.useState(false);

  if (error) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-200 rounded flex items-center justify-center`}>
        <span className="text-xs text-gray-500">
          {type.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <img
        src={SPELL_ICONS[type]}
        alt={type.toLowerCase().replace('_', ' ')}
        className="w-full h-full object-contain select-none"
        draggable={false}
        onError={() => setError(true)}
      />
    </div>
  );
};