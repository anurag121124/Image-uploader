import React, { useCallback, useState } from 'react';
import { useStore } from '../store/useStore';
import { CommentMarker } from './CommentMarker';
import { NewCommentPopup } from './NewCommentPopup';

export const ImageViewer: React.FC = () => {
  const selectedImage = useStore((state) => state.selectedImage);
  const comments = useStore((state) => state.comments);
  const addComment = useStore((state) => state.addComment);
  const [newCommentPosition, setNewCommentPosition] = useState<{ x: number; y: number } | null>(null);

  const handleImageClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedImage) return;

      // Check if we clicked on a comment marker
      const target = e.target as HTMLElement;
      const isCommentMarker = target.closest('.comment-marker');
      if (isCommentMarker) return;

      // Get the clicked coordinates relative to the container
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setNewCommentPosition({ x, y });
    },
    [selectedImage]
  );

  const handleCommentSubmit = useCallback(
    (text: string) => {
      if (!selectedImage || !newCommentPosition || !text.trim()) return;

      addComment({
        id: crypto.randomUUID(),
        x: newCommentPosition.x,
        y: newCommentPosition.y,
        text,
        replies: [],
        imageId: selectedImage.id,
        createdAt: Date.now(),
      });
      setNewCommentPosition(null);
    },
    [selectedImage, newCommentPosition, addComment]
  );

  if (!selectedImage) {
    return null;
  }

  const imageComments = comments.filter(
    (comment) => comment.imageId === selectedImage.id
  );

  return (
    <div 
      className="relative inline-block" 
      style={{ maxWidth: '100%' }}
      onClick={handleImageClick}
    >
      <img
        src={selectedImage.url}
        alt={selectedImage.name}
        className="w-[400px] h-auto rounded-lg"
      />
      {imageComments.map((comment, index) => (
        <CommentMarker key={comment.id} comment={comment} index={index} />
      ))}
      {newCommentPosition && (
        <NewCommentPopup
          x={newCommentPosition.x}
          y={newCommentPosition.y}
          onSubmit={handleCommentSubmit}
          onCancel={() => setNewCommentPosition(null)}
        />
      )}
    </div>
  );
};