import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Comment } from '../types';
import { X } from 'lucide-react';

interface CommentMarkerProps {
  comment: Comment;
  index: number;
}

export const CommentMarker: React.FC<CommentMarkerProps> = ({ comment, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateComment = useStore((state) => state.updateComment);
  const deleteComment = useStore((state) => state.deleteComment);
  const addReply = useStore((state) => state.addReply);
  const updateReply = useStore((state) => state.updateReply);
  const deleteReply = useStore((state) => state.deleteReply);
  const commentRef = useRef<HTMLDivElement>(null);

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.stopPropagation();
      updateComment(comment.id, e.target.value);
    },
    [comment.id, updateComment]
  );

  const handleReplyChange = useCallback(
    (replyId: string, text: string) => {
      updateReply(comment.id, replyId, text);
    },
    [comment.id, updateReply]
  );

  const handleAddReply = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addReply(comment.id, {
        id: crypto.randomUUID(),
        text: '',
        createdAt: Date.now(),
      });
    },
    [comment.id, addReply]
  );

  const handleDeleteReply = useCallback(
    (e: React.MouseEvent, replyId: string) => {
      e.stopPropagation();
      deleteReply(comment.id, replyId);
    },
    [comment.id, deleteReply]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteComment(comment.id);
    },
    [comment.id, deleteComment]
  );

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Handle click outside to close the popup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (commentRef.current && !commentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="absolute comment-marker"
      style={{ 
        left: `${comment.x}%`, 
        top: `${comment.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      ref={commentRef}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <div 
          className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm cursor-pointer hover:bg-blue-600 transition-colors shadow-md"
          onClick={togglePopup}
        >
          {index + 1}
        </div>
        {isOpen && (
          <div 
            className="absolute left-8 top-0 bg-white rounded-lg shadow-lg p-3 w-72 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="mb-3">
              <textarea
                className="w-full p-2 border border-gray-200 rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={comment.text}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                rows={3}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="space-y-2">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="bg-gray-50 p-2 rounded group">
                  <div className="flex justify-between items-start">
                    <textarea
                      className="flex-1 bg-transparent resize-none focus:outline-none text-xs"
                      value={reply.text}
                      onChange={(e) => handleReplyChange(reply.id, e.target.value)}
                      placeholder="Add a reply..."
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      onClick={(e) => handleDeleteReply(e, reply.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-3 text-xs text-blue-500 hover:text-blue-600 transition-colors"
              onClick={handleAddReply}
            >
              Add Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};