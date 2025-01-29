import Image from "next/image";
import { useEffect, useRef } from "react";
import { useImageStore } from "../../../store/Img3/UseImageStore";
import { fetchImageUrl } from "../../../hooks/Img3/FetchImage";
import { gsap } from "gsap";
import Link from "next/link";

export const GetImage3 = () => {
  const { imageUrl, setImageData, imageLink } = useImageStore();
  const ImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const loadImageUrl = async () => {
      const data = await fetchImageUrl();
      if (data) {
        setImageData(data.url, data.link);
      }
    };

    loadImageUrl();
  }, [setImageData]);

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
        <Link href={imageLink} target="_blank">
          <Image
          quality={100}
            src={imageUrl}
            alt="Project"
            draggable={false}
            className="object-cover"
            width={10000}
            height={10000}
          />
        </Link>
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