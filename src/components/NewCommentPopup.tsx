import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface NewCommentPopupProps {
  x: number;
  y: number;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

export const NewCommentPopup: React.FC<NewCommentPopupProps> = ({
  x,
  y,
  onSubmit,
  onCancel,
}) => {
  const [text, setText] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (text.trim()) {
        onSubmit(text);
      }
    },
    [text, onSubmit]
  );

  // Handle click outside to close the popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onCancel();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div
      className="absolute comment-marker"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      ref={popupRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute left-8 top-0 bg-white rounded-lg shadow-lg p-3 w-72 z-10 border border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-gray-500">New Comment</span>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="w-full p-2 border border-gray-200 rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!text.trim()}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};