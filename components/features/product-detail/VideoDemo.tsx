'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface VideoDemoProps {
  videoUrl?: string;
  productName: string;
}

export default function VideoDemo({ videoUrl, productName }: VideoDemoProps) {
  if (!videoUrl) return null;

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;

  return (
    <AnimatedSection className='py-12'>
      <div className='space-y-6'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900'>Video Demo</h2>
        <div className='relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg'>
          <iframe
            src={embedUrl}
            title={`${productName} demo video`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='absolute inset-0 w-full h-full'
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
