'use client';

import { motion } from 'framer-motion';

interface CompareButtonProps {
  className?: string;
}

export default function CompareButton({ className = '' }: CompareButtonProps) {
  const handleCompare = () => {
    // TODO: Implement compare functionality
    console.log('Compare clicked');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleCompare}
      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-beige-50 transition-colors ${className}`}
      aria-label='Compare'
    >
      <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        />
      </svg>
    </motion.button>
  );
}
