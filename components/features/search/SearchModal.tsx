'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Clear search when modal closes
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    // Simulate search delay for better UX
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [searchQuery]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl max-h-[80vh] flex flex-col p-0'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Search Products</DialogTitle>
          <DialogDescription>Search for products by name or description</DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className='p-4 border-b border-gray-200'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              ref={inputRef}
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for products...'
              className='w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-beige-600 focus:border-transparent outline-none'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className='flex-1 overflow-y-auto'>
          {isLoading ? (
            <div className='p-8 text-center'>
              <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-beige-600'></div>
              <p className='mt-4 text-gray-600'>Searching...</p>
            </div>
          ) : searchQuery.trim() && searchResults.length === 0 ? (
            <div className='p-8 text-center'>
              <svg
                className='w-16 h-16 mx-auto text-gray-300 mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <p className='text-gray-600 font-medium'>No products found</p>
              <p className='text-sm text-gray-500 mt-2'>Try searching with different keywords</p>
            </div>
          ) : !searchQuery.trim() ? (
            <div className='p-8 text-center'>
              <svg
                className='w-16 h-16 mx-auto text-gray-300 mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <p className='text-gray-600 font-medium'>Start typing to search</p>
              <p className='text-sm text-gray-500 mt-2'>
                Search for products by name or description
              </p>
            </div>
          ) : (
            <div className='p-4'>
              <p className='text-sm text-gray-600 mb-4'>
                Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
              </p>
              <div className='space-y-2'>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className='w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group'
                  >
                    <div className='relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-300'
                        sizes='64px'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-semibold text-gray-900 truncate group-hover:text-beige-600 transition-colors'>
                        {product.name}
                      </h3>
                      <p className='text-sm text-gray-600 truncate'>{product.description}</p>
                      <div className='flex items-center gap-2 mt-1'>
                        <span className='text-lg font-bold text-gray-900'>
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className='text-sm text-gray-400 line-through'>
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        {product.badge && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              product.badge === 'new'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {product.badge === 'new' ? 'New' : `-${product.discount}%`}
                          </span>
                        )}
                      </div>
                    </div>
                    <svg
                      className='w-5 h-5 text-gray-400 group-hover:text-beige-600 transition-colors flex-shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl'>
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <div className='flex items-center gap-4'>
              <kbd className='px-2 py-1 bg-white border border-gray-300 rounded text-xs'>ESC</kbd>
              <span>to close</span>
            </div>
            <button onClick={onClose} className='text-beige-600 hover:text-beige-700 font-medium'>
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
