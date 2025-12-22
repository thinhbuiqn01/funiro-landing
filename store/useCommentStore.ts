import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Comment } from '@/types'
import { initialComments } from '@/lib/mockData'
import { getAvatarUrl } from '@/lib/utils/avatar'

interface CommentStore {
  comments: Comment[]
  addComment: (comment: Omit<Comment, 'id' | 'date'>) => void
  addReply: (commentId: string, reply: Omit<Comment, 'id' | 'date' | 'replies'>) => void
  getCommentsByProductId: (productId: string) => Comment[]
  initialized: boolean
  initializeComments: () => void
}

export const useCommentStore = create<CommentStore>()(
  persist(
    (set, get) => ({
      comments: [],
      initialized: false,
      initializeComments: () => {
        if (!get().initialized && get().comments.length === 0) {
          set({ comments: initialComments, initialized: true })
        }
      },
      addComment: (commentData) => {
        const newComment: Comment = {
          ...commentData,
          id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          replies: [],
          avatar: commentData.avatar || getAvatarUrl(commentData.userName || 'User'),
        }
        set({ comments: [...get().comments, newComment] })
      },
      addReply: (commentId, replyData) => {
        const newReply: Comment = {
          ...replyData,
          id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          avatar: replyData.avatar || getAvatarUrl(replyData.userName || 'User'),
        }
        set({
          comments: get().comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, replies: [...(comment.replies || []), newReply] }
              : comment
          ),
        })
      },
      getCommentsByProductId: (productId) => {
        return get().comments.filter((comment) => comment.productId === productId)
      },
    }),
    {
      name: 'comment-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && !state.initialized && state.comments.length === 0) {
          state.comments = initialComments
          state.initialized = true
        }
      },
    }
  )
)

// Initialize comments on store creation
if (typeof window !== 'undefined') {
  useCommentStore.getState().initializeComments()
}

