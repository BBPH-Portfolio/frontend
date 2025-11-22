import Image from "next/image";
import { useEffect } from "react";
import { useImageStore } from "../store/UseImageStore";
import { fetchImageUrl } from "../hooks/FetchImage";

export const GetImage = () => {
  const { imageUrl, setImageUrl } = useImageStore();

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchImageUrl();
      if (url) {
        setImageUrl(url);
      }
    };

    loadImage();
  }, [setImageUrl]);

  return (
    <>
      {imageUrl.length > 0 ? (
       
          <Image
            src={imageUrl}
            quality={100}
            width={10000}
            height={10000}
            alt="Picture"
            draggable={false}
            className="w-full h-full object-cover"
          />
       
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-4 min-h-[400px]">
          <div className="flex items-center justify-center w-20 h-20 text-4xl text-white border-4 border-transparent rounded-full animate-spin border-t-white">
            <div className="flex items-center justify-center w-16 h-16 text-2xl text-black border-4 border-transparent rounded-full animate-spin border-t-black"></div>
          </div>
        </div>
      )}
    </>
  );
};

