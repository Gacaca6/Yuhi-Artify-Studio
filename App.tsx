import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptControls } from './components/PromptControls';
import { ArtDisplay } from './components/ArtDisplay';
import { Loader } from './components/Loader';
import { GeneratedArt } from './types';
import { generateImageFromPrompt, generateArtDescription } from './services/geminiService';

export default function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedArt, setGeneratedArt] = useState<GeneratedArt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setGeneratedArt(null);
    setError(null);

    try {
      // Step 1: Generate the image from the prompt
      const generatedImageBase64 = await generateImageFromPrompt(prompt);
      if (!generatedImageBase64) {
        throw new Error("Image generation failed. The model did not return an image.");
      }
      
      const generatedImageMimeType = 'image/png'; // Gemini Flash Image model generally returns PNG

      // Step 2: Generate a description for the new image
      const { title, description } = await generateArtDescription(generatedImageBase64, generatedImageMimeType, prompt);

      setGeneratedArt({
        image: `data:${generatedImageMimeType};base64,${generatedImageBase64}`,
        title,
        description,
      });

    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred. Please try again.";
      setError(`Generation Failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900/50 flex flex-col p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="flex-grow container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Left Column: Controls */}
        <div className="flex flex-col">
          <PromptControls
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column: Display */}
        <div className="relative bg-black/30 rounded-lg backdrop-blur-sm border border-gray-700/50 p-6 flex items-center justify-center min-h-[400px] lg:min-h-0">
          {isLoading && <Loader />}
          {!isLoading && error && (
            <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-md">
              <h3 className="font-bold text-lg mb-2">Error</h3>
              <p>{error}</p>
            </div>
          )}
          {!isLoading && !error && (
            <ArtDisplay art={generatedArt} />
          )}
        </div>
      </main>
    </div>
  );
}