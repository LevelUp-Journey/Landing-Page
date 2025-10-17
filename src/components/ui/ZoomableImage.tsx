import React, { useState } from 'react';

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`${className} cursor-pointer`}
        onClick={() => setIsOpen(true)}
      />

      <div
        className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`relative max-w-4xl max-h-full p-4 transform transition-transform duration-300 ${
            isOpen ? 'scale-100' : 'scale-95'
          }`}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
      </div>
    </>
  );
};