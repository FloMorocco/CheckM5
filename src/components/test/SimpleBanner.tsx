import React from 'react';

export const SimpleBanner: React.FC = () => {
  return (
    <div className="relative w-full h-20 bg-gray-100">
      <img 
        src="/banner.png"
        alt="Banner"
        className="w-full h-full object-contain"
        onError={(e) => {
          console.error('Image failed to load:', (e.target as HTMLImageElement).src);
        }}
      />
    </div>
  );
};