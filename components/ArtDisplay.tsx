import React from 'react';
import { GeneratedArt } from '../types';
import { ImageIcon, DownloadIcon } from './icons';

interface ArtDisplayProps {
  art: GeneratedArt | null;
}

const Placeholder: React.FC = () => (
    <div className="text-center text-gray-500">
        <ImageIcon className="w-24 h-24 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Your Masterpiece Awaits</h3>
        <p className="mt-2">
            Describe the art you envision and click 'Artify' to begin.
        </p>
    </div>
);

export const ArtDisplay: React.FC<ArtDisplayProps> = ({ art }) => {
  if (!art) {
    return <Placeholder />;
  }

  const handleDownload = () => {
    if (!art) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = art.image;

    // Sanitize title for filename
    const fileName = `${art.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start animate-fade-in overflow-y-auto py-4">
        <div className="w-full max-w-lg aspect-square mb-6 bg-gray-900 rounded-lg overflow-hidden shadow-2xl shadow-indigo-900/40 shrink-0">
            <img src={art.image} alt={art.title} className="w-full h-full object-contain" />
        </div>
        <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">{art.title}</h2>
            <p className="mt-2 text-gray-300 max-w-xl">{art.description}</p>
            <button
              onClick={handleDownload}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-transparent border border-indigo-500 text-indigo-400 font-semibold py-2 px-6 rounded-md hover:bg-indigo-500 hover:text-white transition-all duration-300 transform active:scale-95"
            >
              <DownloadIcon className="w-5 h-5" />
              Download Art
            </button>
        </div>
    </div>
  );
};