import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment, Image, Reply } from '../types';

interface Store {
  images: Image[];
  comments: Comment[];
  selectedImage: Image | null;
  addImage: (image: Image) => void;
  removeImage: (id: string) => void;
  setSelectedImage: (image: Image | null) => void;
  addComment: (comment: Comment) => void;
  updateComment: (id: string, text: string) => void;
  deleteComment: (id: string) => void;
  addReply: (commentId: string, reply: Reply) => void;
  updateReply: (commentId: string, replyId: string, text: string) => void;
  deleteReply: (commentId: string, replyId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      images: [],
      comments: [],
      selectedImage: null,
      addImage: (image) =>
        set((state) => ({ images: [...state.images, image] })),
      removeImage: (id) =>
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
          comments: state.comments.filter((comment) => comment.imageId !== id),
        })),
      setSelectedImage: (image) => set({ selectedImage: image }),
      addComment: (comment) =>
        set((state) => ({ comments: [...state.comments, comment] })),
      updateComment: (id, text) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === id ? { ...comment, text } : comment
          ),
        })),
      deleteComment: (id) =>
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== id),
        })),
      addReply: (commentId, reply) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...comment.replies, reply] }
              : comment
          ),
        })),
      updateReply: (commentId, replyId, text) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === replyId ? { ...reply, text } : reply
                  ),
                }
              : comment
          ),
        })),
      deleteReply: (commentId, replyId) =>
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.filter((reply) => reply.id !== replyId),
                }
              : comment
          ),
        })),
    }),
    {
      name: 'image-annotation-storage',
    }
  )
);