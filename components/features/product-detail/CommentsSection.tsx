'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Avatar from '@/components/ui/Avatar';
import { useCommentStore } from '@/store/useCommentStore';
import { Product } from '@/types';
import Button from '@/components/ui/Button';

interface CommentsSectionProps {
  product: Product;
}

export default function CommentsSection({ product }: CommentsSectionProps) {
  const comments = useCommentStore((state) => state.getCommentsByProductId(product.id));
  const addComment = useCommentStore((state) => state.addComment);
  const addReply = useCommentStore((state) => state.addReply);
  const initializeComments = useCommentStore((state) => state.initializeComments);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    initializeComments();
  }, [initializeComments]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    userName: '',
    text: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyingTo) {
      addReply(replyingTo, {
        productId: product.id,
        userId: `user-${Date.now()}`,
        userName: formData.userName || 'Anonymous',
        text: formData.text,
      });
      setReplyingTo(null);
    } else {
      addComment({
        productId: product.id,
        userId: `user-${Date.now()}`,
        userName: formData.userName || 'Anonymous',
        text: formData.text,
      });
    }
    setFormData({ userName: '', text: '' });
    setShowForm(false);
  };

  return (
    <AnimatedSection className='py-12'>
      <div className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>
            Comments ({comments.length})
          </h2>
          <Button onClick={() => setShowForm(!showForm)}>Add Comment</Button>
        </div>

        {/* Comment Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className='p-6 bg-gray-50 rounded-2xl space-y-4'
          >
            {replyingTo && (
              <div className='p-3 bg-beige-50 rounded-lg'>
                <p className='text-sm text-gray-600'>Replying to comment</p>
                <button
                  type='button'
                  onClick={() => {
                    setReplyingTo(null);
                    setFormData({ userName: '', text: '' });
                  }}
                  className='text-sm text-beige-600 hover:text-beige-700 mt-1'
                >
                  Cancel reply
                </button>
              </div>
            )}
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
              <label className='block text-sm font-medium text-gray-700 mb-2'>Comment</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                rows={4}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent'
                placeholder='Write your comment...'
                required
              />
            </div>
            <div className='flex gap-4'>
              <Button type='submit'>{replyingTo ? 'Post Reply' : 'Post Comment'}</Button>
              <Button
                type='button'
                variant='outline'
                onClick={() => {
                  setShowForm(false);
                  setReplyingTo(null);
                  setFormData({ userName: '', text: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}

        {/* Comments List */}
        <div className='space-y-6'>
          {comments.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='p-6 bg-white border border-gray-200 rounded-2xl'
              >
                <div className='flex items-start gap-4 mb-3'>
                  <Avatar src={comment.avatar} name={comment.userName} size={48} />
                  <div className='flex-1'>
                    <div className='flex items-start justify-between mb-2'>
                      <div>
                        <h4 className='font-semibold text-gray-900'>{comment.userName}</h4>
                        <span className='text-sm text-gray-500'>
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setReplyingTo(comment.id);
                          setShowForm(true);
                        }}
                        className='text-sm text-beige-600 hover:text-beige-700 font-medium'
                      >
                        Reply
                      </button>
                    </div>
                    <p className='text-gray-700 mb-4'>{comment.text}</p>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className='ml-16 pl-6 border-l-2 border-gray-200 space-y-4 mt-4'>
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className='pt-4 flex items-start gap-3'>
                        <Avatar src={reply.avatar} name={reply.userName} size={40} />
                        <div className='flex-1'>
                          <div className='flex items-start justify-between mb-2'>
                            <div>
                              <h5 className='font-semibold text-gray-900 text-sm'>
                                {reply.userName}
                              </h5>
                              <span className='text-xs text-gray-500'>
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className='text-gray-700 text-sm'>{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}
