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

  useEffect(() => {
    if (ImgRef.current) {
      gsap.fromTo(
        ImgRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 2,
        }
      );
    }
  }, []);

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
          ref={ImgRef}
          className="w-[20rem] h-[33rem] sm:w-[30rem] sm:h-[43rem] object-cover mt-20 lg:mt-0"
        />
      ) : (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-white text-4xl animate-spin flex items-center justify-center border-t-white rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-black text-2xl animate-spin flex items-center justify-center border-t-black rounded-full"></div>
          </div>
        </div>
      )}
    </>
  );
};
