"use client";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchImagesUrl } from "./hooks/FetchImages";
import { useImageStore } from "./store/UseImageGallery";
import { DialogImageGallery } from "./components/DialogImageGallery";
import { DialogAdd } from "./components/DialogAdd";
import ImageViewer from "./components/ViewerImg";
import DropDonwn from "@/components/navbar/DropDonwn";
import { useMixBlend } from "@/store/store";

const Gallery = () => {
  const [token, setToken] = useState(false);
  const { setImageData, getOrderedImages } = useImageStore();
  const orderedImages = getOrderedImages();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const { mixBlend } = useMixBlend();
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

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="fixed md:w-[23%] w-40 top-14 justify-end flex items-center z-[100] right-[6%]">
          <DropDonwn />
        </div>

        <div
          className={`z-[1] fixed w-[88%] mx-auto max-w-[90.75rem] justify-end flex items-end   ${
            mixBlend ? "mix-blend-difference" : ""
          }`}
        >
          <Navbar />
        </div>
      </div>

      <div className="md:w-[23%] w-40 flex md:pt-[0rem] absolute md:relative left-[6%] top-32 md:top-0 justify-between">
        <div className="mt-[4rem] text-[#8B8B8B] font-[DmSansMedium] md:text-[1rem] text-sm">
          <Link
            href="/gallery"
            className="cursor-none mr-[10%] text-[#8B8B8B]"
          >
            COMMERCIAL
          </Link>
        </div>
        <div className="mt-[4rem] font-[DmSansMedium] md:text-[1rem] text-sm">
          <Link href="/gallery/raw" className="text-black dark:text-color1 cursor-none">
            RAW
          </Link>
        </div>
      </div>


      <section className="w-[88%] mx-auto max-w-[125.75rem]">
        <section className="w-full h-auto mb-[5rem] mt-60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {orderedImages.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden relative w-full aspect-[3/2]"
              >
                <img
                  src={image.url}
                  alt={image.alt || `Image ${image.id}`}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  draggable={false}
                  onClick={() => openImageViewer(index)}
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

      {selectedImageIndex !== null && (
        <ImageViewer
          images={orderedImages}
          initialIndex={selectedImageIndex}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};

export default Gallery;
