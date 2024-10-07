import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageViewerProps {
  images: { id: string; url: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button onClick={onClose} className="absolute top-4 right-4 text-white cursor-none">
        <X size={24} />
      </button>
      <button onClick={goToPrevious} className="absolute left-4 text-white">
        <ChevronLeft size={24} />
      </button>
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt}
        className="aspect-[3/2] w-[70rem] object-cover"
      />
      <button onClick={goToNext} className="absolute right-4 text-white cursor-none">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageViewer;