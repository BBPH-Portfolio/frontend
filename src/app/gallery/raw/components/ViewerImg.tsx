import Image from "next/image";
import React, { useState } from "react";
interface ImageViewerProps {
  images: { id: string; url: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  images,
  initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#141414] flex items-center justify-center z-50">
      <div className="absolute left-[8.1%] top-[7rem] max-md:top-[9rem] text-black  dark:text-white xl:top-[22rem]">
        <button className="italic cursor-none" onClick={goToPrevious}>
          previous
        </button>
        {" /"}
        <button className="italic cursor-none" onClick={goToNext}>
          next
        </button>
      </div>

      <div className="absolute left-[15rem] top-[7rem] max-md:top-[9rem] xl:top-[24rem] xl:left-[7%]">
        <button
          onClick={onClose}
          className="text-black dark:text-white cursor-none italic"
        >
          show thumbnails
        </button>
      </div>
      <Image
        width={1000}
        height={1000}
        src={images[currentIndex].url}
        alt={images[currentIndex].alt}
        className="aspect-[3/2] w-[50rem] object-cover"
      />
    </div>
  );
};

export default ImageViewer;
