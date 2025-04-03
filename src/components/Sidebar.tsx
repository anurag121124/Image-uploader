import React, { useRef } from 'react';
import { useStore } from '../store/useStore';
import { Image, Folder, ChevronLeft, ChevronRight, Upload } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const images = useStore((state) => state.images);
  const selectedImage = useStore((state) => state.selectedImage);
  const comments = useStore((state) => state.comments);
  const setSelectedImage = useStore((state) => state.setSelectedImage);
  const addImage = useStore((state) => state.addImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
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
    // Reset the input value so the same file can be uploaded again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Folder className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Folder</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-700">Images</h2>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-blue-500 hover:text-blue-600 flex items-center"
            >
              <Upload size={12} className="mr-1" />
              Upload
            </button>
          </div>
          <div className="space-y-1">
            {images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className={`flex items-center p-2 rounded text-sm cursor-pointer ${
                    selectedImage?.id === image.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="truncate">{image.name}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm py-2">No images uploaded</div>
            )}
          </div>
        </div>

        {selectedImage && comments.filter((c) => c.imageId === selectedImage.id).length > 0 && (
          <div className="p-3 border-t border-gray-200">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Comments</h2>
            <div className="space-y-2">
              {comments
                .filter((comment) => comment.imageId === selectedImage.id)
                .map((comment, index) => (
                  <div key={comment.id} className="bg-gray-50 p-2 rounded text-sm">
                    <div className="flex items-center mb-1">
                      <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
                        {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.text}</p>
                    {comment.replies.length > 0 && (
                      <div className="pl-3 mt-1 border-l-2 border-gray-200 space-y-1">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="text-xs text-gray-600">
                            {reply.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-2 border-t border-gray-200 flex justify-between items-center">
        <button className="p-1 rounded hover:bg-gray-100">
          <ChevronLeft size={16} />
        </button>
        <button className="p-1 rounded hover:bg-gray-100">
          <ChevronRight size={16} />
        </button>
        <button className="text-xs text-gray-600 p-1 hover:text-gray-800">
          Restart
        </button>
      </div>
    </div>
  );
};