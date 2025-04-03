// App.tsx - Main application component
import React from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { useStore } from './store/useStore';

const App: React.FC = () => {
  const selectedImage = useStore((state) => state.selectedImage);
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          {selectedImage ? (
            <ImageViewer />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="w-full max-w-2xl mx-auto">
                <ImageUploader />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;