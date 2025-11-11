import React from 'react';
import { SparklesIcon } from './icons';
import { ArtStyle, artStyles } from '../types';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  style: ArtStyle;
  setStyle: (style: ArtStyle) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, style, setStyle, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-200 mb-4">Describe Your Vision</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., 'A lone astronaut contemplating a cosmic nebula'"
        rows={6}
        className="w-full flex-grow bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 disabled:opacity-50 resize-none"
        disabled={isLoading}
      />

      <div className="mt-4">
        <label htmlFor="art-style-select" className="block text-sm font-medium text-gray-300 mb-2">
            Art Style
        </label>
        <select
            id="art-style-select"
            value={style}
            onChange={(e) => setStyle(e.target.value as ArtStyle)}
            disabled={isLoading}
            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 disabled:opacity-50"
        >
            {artStyles.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
            ))}
        </select>
      </div>

      <button
        onClick={onGenerate}
        disabled={!prompt.trim() || isLoading}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Artify
          </>
        )}
      </button>
    </div>
  );
};
