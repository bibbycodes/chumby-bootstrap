// components/Slideshow.tsx
'use client';
import React, {useState, useEffect} from 'react';
import Image from "next/image";

export interface Slide {
  image: string;
  caption?: string;
}

interface SlideshowProps {
  slides: Slide[];
  duration: number
}

const Slideshow: React.FC<SlideshowProps> = ({slides, duration}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, duration);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={'relative flex flex-col items-center justify-center h-[400px]'}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-auto right-auto transition-opacity duration-${1000} ${
            currentSlideIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full w-full overflow-hidden relative">
            <Image
              width={500}
              height={500}
              className={'mx-auto'}
              src={slide.image}
              alt={slide?.caption ?? `Image ${index + 1}`}
            />
            <div>
              {slide?.caption && (
                <div
                  className="text-secondary font-bubble opacity-80 text-center p-2 text-xl absolute bottom-0 left-0 w-full"
                  style={{ top: '85%' }}>
                  "{slide?.caption}"
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
