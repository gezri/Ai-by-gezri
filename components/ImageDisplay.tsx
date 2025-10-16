
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  prompt: string;
}

const LoadingSkeleton: React.FC = () => (
  <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
      <div className="text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-2 font-semibold text-gray-600 dark:text-gray-400">Generating your masterpiece...</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">This can take a moment.</p>
    </div>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
    <div className="text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-2 font-semibold text-gray-600 dark:text-gray-400">Your generated image will appear here.</p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">Click "Generate Image" to start.</p>
    </div>
  </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, prompt }) => {
  return (
    <div className="w-full aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      {isLoading ? (
        <LoadingSkeleton />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-contain rounded-md"
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
};
