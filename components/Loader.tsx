import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center z-10">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-indigo-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 border-4 border-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute inset-4 border-4 border-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-200 animate-pulse">Conjuring brilliance...</p>
    </div>
  );
};