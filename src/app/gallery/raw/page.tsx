"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchImagesUrl } from "./hooks/FetchImages";
import { useImageStore } from "./store/UseImageGallery";
import { DialogImageGallery } from "./components/DialogImageGallery";
import { DialogAdd } from "./components/DialogAdd";

const Gallery = () => {
  const [token, setToken] = useState(false);
  const { setImageData, getOrderedImages } = useImageStore();
  const orderedImages = getOrderedImages();
  const [isLoading, setIsLoading] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(true);
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImagesUrl();
      if (fetchedImages) {
        setImageData(fetchedImages);
      }
      setIsLoading(false);
    };
    loadImages();
  }, [setImageData]);

  if (isLoading) return <div></div>;

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="mix-blend-difference z-[1] fixed w-[88%] mx-auto max-w-[90.75rem]">
          <Navbar />
        </div>
      </div>

      <section className="w-[88%] mx-auto max-w-[125.75rem]">
        <section className="h-[70vh] flex justify-center">
          <div>
            <h1
              className="Title text-[5rem] lg:text-[13rem] text-black dark:text-color1 font-[HelveticaExtraBold] leading-[6rem] mt-[15rem] sm:text-[8rem]"
              ref={titleRef}
            >
              <span className="tracking-tight" ref={titleRef}>
                GALLERY
              </span>
            </h1>
            <div className="flex flex-col w-full ml-[12rem] mt-[4rem] text-[#8B8B8B]  font-[DmSansMedium] text-xl lg:ml-[26rem] sm:ml-[20rem]">
              <Link href="/gallery" className="cursor-none">PORTRAIT</Link>
              <Link href="/gallery/commercial" className=" text-[#8B8B8B] cursor-none">
                COMMERCIAL
              </Link>
              <Link href="/gallery/raw" className=" text-black dark:text-color1 cursor-none">
                RAW
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full h-auto mb-[5rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {orderedImages.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden relative w-full aspect-[3/2]"
              >
                <img
                  src={image.url}
                  alt={image.alt || `Image ${image.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  draggable={false}
                />
                {token && (
                  <DialogImageGallery
                    id={image.id}
                    width={image.width}
                    height={image.height}
                  />
                )}
              </div>
            ))}
            {token && (
              <div className="flex justify-center items-center overflow-hidden rounded-lg relative bg-[#8b8b8b33] hover:scale-105 transition-transform duration-300 w-full aspect-[3/2]">
                <DialogAdd />
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default Gallery;
