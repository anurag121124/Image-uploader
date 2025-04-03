import React, { useCallback, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ImageUploader: React.FC = () => {
  const addImage = useStore((state) => state.addImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            addImage({
              id: crypto.randomUUID(),
              url: reader.result as string,
              name: file.name,
            });
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [addImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      processFiles(files);
      // Reset the input value so the same files can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [processFiles]
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center bg-gray-50"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <img
            src="/src/asset/image.png"
            alt="Upload basket"
            className="w-32 h-32"
          />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Drop images here</h3>
        <p className="text-gray-500 text-sm mb-6">or use Upload button to upload multiple images</p>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
        />
        
        <button
          onClick={handleButtonClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Upload size={18} />
          <span className="ml-2">Upload</span>
        </button>
      </div>
    </div>
  );
};