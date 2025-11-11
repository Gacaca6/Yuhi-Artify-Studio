import React, { useRef, ChangeEvent } from 'react';
import { UploadCloudIcon } from './icons';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  previewUrl: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, previewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
        onImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 flex-grow flex flex-col">
      <h2 className="text-xl font-bold text-gray-200 mb-4">1. Upload Your Canvas</h2>
      <div 
        className="flex-grow border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center flex-col p-6 text-gray-400 cursor-pointer hover:border-indigo-500 hover:bg-gray-800/70 transition-all duration-300"
        onClick={handleButtonClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {previewUrl ? (
          <div className="relative w-full h-full max-h-64">
             <img src={previewUrl} alt="Image preview" className="object-contain w-full h-full rounded-md" />
             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-semibold">Click or Drop to Change Image</p>
             </div>
          </div>
        ) : (
          <div className="text-center">
            <UploadCloudIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
            <p className="font-semibold">Click to upload or drag & drop</p>
            <p className="text-sm">PNG, JPG, WEBP, etc.</p>
          </div>
        )}
      </div>
    </div>
  );
};