'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { useReviewStore } from '@/store/useReviewStore'
import { Product } from '@/types'

interface ReviewsSectionProps {
  product: Product
}

export default function ReviewsSection({ product }: ReviewsSectionProps) {
  const reviews = useReviewStore((state) => state.getReviewsByProductId(product.id))
  const averageRating = useReviewStore((state) => state.getAverageRating(product.id))
  const addReview = useReviewStore((state) => state.addReview)
  const initializeReviews = useReviewStore((state) => state.initializeReviews)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    initializeReviews()
  }, [initializeReviews])
  const [formData, setFormData] = useState({
    userName: '',
    rating: 5,
    comment: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addReview({
      productId: product.id,
      userId: `user-${Date.now()}`,
      userName: formData.userName || 'Anonymous',
      rating: formData.rating,
      comment: formData.comment,
    })
    setFormData({ userName: '', rating: 5, comment: '' })
    setShowForm(false)
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className='flex gap-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <AnimatedSection className='py-12'>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>Reviews</h2>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <StarRating rating={Math.round(averageRating)} />
                <span className='text-lg font-semibold text-gray-900'>
                  {averageRating.toFixed(1)}
                </span>
                <span className='text-gray-600'>({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>Write Review</Button>
        </div>

        {/* Review Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className='p-6 bg-gray-50 rounded-2xl space-y-4'
          >
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Your Name</label>
              <input
                type='text'
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
                placeholder='Enter your name'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Rating</label>
              <div className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type='button'
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${
                      formData.rating >= rating
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-300 hover:border-yellow-300'
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Comment</label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={4}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
                placeholder='Write your review...'
                required
              />
            </div>
            <div className='flex gap-4'>
              <Button type='submit'>Submit Review</Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setShowForm(false)
                  setFormData({ userName: '', rating: 5, comment: '' })
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}

        {/* Reviews List */}
        <div className='space-y-6'>
          {reviews.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='p-6 bg-white border border-gray-200 rounded-2xl'
              >
                <div className='flex items-start gap-4 mb-3'>
                  <Avatar src={review.avatar} name={review.userName} size={48} />
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-2'>
                      <div>
                        <h4 className='font-semibold text-gray-900'>{review.userName}</h4>
                        <StarRating rating={review.rating} />
                      </div>
                      <span className='text-sm text-gray-500'>
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className='text-gray-700'>{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}

