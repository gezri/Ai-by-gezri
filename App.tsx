
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptControls } from './components/PromptControls';
import { ImageDisplay } from './components/ImageDisplay';
import { generateImageFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const initialPrompt = `Square profile image: a clean rounded box container with a friendly cartoon/icon portrait of a cute fox in the center (bust shot), cheerful expression, soft cute style. Include three small social badge icons aligned underneath: TikTok (label: ish owfurry), Instagram (label: Zulhaif_), YouTube (label: gezri). Background: smooth rainbow gradient with subtle light streaks. Composition: bold simple shapes, high contrast for small-scale legibility, glossy finish, slight drop shadow, professional avatar look, ultra-detailed, clean vector-like rendering. Include text at the bottom of the image in a readable banner: "welcome to you my owned is webite!" — use rounded friendly font, centered. 1:1, 1200×1200 px, export PNG.`;

  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for the image.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImageFromPrompt(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Image Description</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a detailed description of the profile image you want to create. The more specific you are, the better the result will be.
            </p>
            <PromptControls
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGenerateImage}
              isLoading={isLoading}
            />
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-6">
             <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Generated Image</h2>
            <ImageDisplay
              imageUrl={generatedImage}
              isLoading={isLoading}
              prompt={prompt}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
