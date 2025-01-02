import React from 'react';

export const TestBanner: React.FC = () => {
  return (
    <div className="relative w-full h-40 bg-gray-100">
      {/* Test with direct path */}
      <img 
        src="/assets/banner.png"
        alt="Banner Test 1"
        className="w-full h-full object-cover"
        onError={(e) => {
          console.error('Image failed to load:', e);
          const img = e.target as HTMLImageElement;
          console.log('Attempted path:', img.src);
        }}
      />
      
      {/* Test with import */}
      <img 
        src={new URL('../../assets/banner.png', import.meta.url).href}
        alt="Banner Test 2"
        className="w-full h-full object-cover mt-4"
        onError={(e) => {
          console.error('Image failed to load:', e);
          const img = e.target as HTMLImageElement;
          console.log('Attempted path:', img.src);
        }}
      />
    </div>
  );
};