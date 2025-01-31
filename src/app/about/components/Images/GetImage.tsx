import Image from "next/image";
import { useEffect, useRef } from "react";
import { useImageStore } from "../../store/UseImageStore";
import { fetchImageUrl } from "../../hooks/FetchImage";
import { gsap } from "gsap";

export const GetImage = () => {
  const { imageUrl, setImageUrl } = useImageStore();
  const ImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const loadImageUrl = async () => {
      const url = await fetchImageUrl();
      if (url) {
        setImageUrl(url);
      }
    };

    loadImageUrl();
  }, [setImageUrl]);

  return (
    <>
      {imageUrl.length > 0 ? (
        <div className="w-full max-w-[70%] relative">
          <Image
            src={imageUrl}
            quality={100}
            width={10000}
            height={10000}
            alt="Picture"
            draggable={false}
            className="object-contain w-full h-full"
          />
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
