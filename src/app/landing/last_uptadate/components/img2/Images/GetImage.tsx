import Image from "next/image";
import { useEffect, useRef } from "react";
import { useImageStore } from "../../../store/Img2/UseImageStore";
import { fetchImageUrl } from "../../../hooks/Img2/FetchImage";
import { gsap } from "gsap";
import Link from "next/link";

export const GetImage2 = () => {
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
        <Link href={imageLink}  target="_blank">
          <Image
            src={imageUrl}
            alt="Project"
            draggable={false}
            className="object-cover h-[10rem] w-[20rem] mt-[2.3rem]"
            width={10000}
            height={10000}
          />
        </Link>
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
