import Image from "next/image";
import { useEffect, useState } from "react";
import { useImageStore } from "../../store/UseImageStore";
import { fetchImageUrl, fetchImageUrl2 } from "../../hooks/FetchImage";

export const GetImage = () => {
  const { imageUrl, imageUrl2, setImageUrl, setImageUrl2 } = useImageStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const url1 = await fetchImageUrl();
      const url2 = await fetchImageUrl2();
      if (url1) {
        setImageUrl(url1);
      }
      if (url2) {
        setImageUrl2(url2);
      }
    };

    loadImages();
  }, [setImageUrl, setImageUrl2]);

  const hasImages = imageUrl.length > 0 || imageUrl2.length > 0;

  return (
    <>
      {hasImages ? (
        <div
          className="w-full max-w-[70%] relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full">
            {imageUrl && (
              <Image
                src={imageUrl}
                quality={100}
                width={10000}
                height={10000}
                alt="Picture"
                draggable={false}
                className={`object-contain w-full h-full transition-opacity duration-300 ${
                  isHovered && imageUrl2 ? "opacity-0" : "opacity-100"
                }`}
              />
            )}
            {imageUrl2 && (
              <Image
                src={imageUrl2}
                quality={100}
                width={10000}
                height={10000}
                alt="Picture Hover"
                draggable={false}
                className={`object-contain w-full h-full transition-opacity duration-300 absolute inset-0 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <div className="flex items-center justify-center w-20 h-20 text-4xl text-white border-4 border-transparent rounded-full animate-spin border-t-white">
            <div className="flex items-center justify-center w-16 h-16 text-2xl text-black border-4 border-transparent rounded-full animate-spin border-t-black"></div>
          </div>
        </div>
      )}
    </>
  );
};
