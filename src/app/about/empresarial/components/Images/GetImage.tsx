import Image from "next/image";
import { useEffect } from "react";
import { useImageStore } from "../../store/UseImageStore";
import { fetchImageUrl } from "../../hooks/FetchImage";

export const GetImage = () => {
  const { imageUrl, setImageUrl } = useImageStore();

  useEffect(() => {
    const loadImages = async () => {
      const url1 = await fetchImageUrl();
      if (url1) {
        setImageUrl(url1);
      }
    };

    loadImages();
  }, [setImageUrl]);

  return (
    <>
      {imageUrl.length > 0 ? (
        <Image
          quality={100}
          src={imageUrl}
          alt="Picture"
          draggable={false}
          className="object-cover h-full w-full select-none"
          width={10000}
          height={10000}
        />
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
