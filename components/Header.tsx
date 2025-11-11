import React from 'react';
import { SparklesIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center container mx-auto">
      <div className="flex items-center justify-center gap-4">
        <SparklesIcon className="w-10 h-10 text-indigo-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Yuhi Artify Studio
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Your words are the brush, your imagination the canvas. Describe the art you envision, and let Gemini bring it to life.
      </p>
    </header>
  );
};