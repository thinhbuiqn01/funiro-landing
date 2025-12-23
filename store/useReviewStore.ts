import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Review } from '@/types';
import { initialReviews } from '@/lib/mockData';
import { getAvatarUrl } from '@/lib/utils/avatar';

interface ReviewStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getReviewsByProductId: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  initialized: boolean;
  initializeReviews: () => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: [],
      initialized: false,
      initializeReviews: () => {
        if (!get().initialized && get().reviews.length === 0) {
          set({ reviews: initialReviews, initialized: true });
        }
      },
      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          avatar: reviewData.avatar || getAvatarUrl(reviewData.userName || 'User'),
        };
        set({ reviews: [...get().reviews, newReview] });
      },
      getReviewsByProductId: (productId) => {
        return get().reviews.filter((review) => review.productId === productId);
      },
      getAverageRating: (productId) => {
        const productReviews = get().reviews.filter((review) => review.productId === productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return Math.round((sum / productReviews.length) * 10) / 10;
      },
    }),
    {
      name: 'review-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && !state.initialized && state.reviews.length === 0) {
          state.reviews = initialReviews;
          state.initialized = true;
        }
      },
    }
  )
);

// Initialize reviews on store creation
if (typeof window !== 'undefined') {
  useReviewStore.getState().initializeReviews();
}
