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
import Switch from "@/components/Switch";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Background from "@/components/navbar/Background";

const Gallery = () => {
  const [token, setToken] = useState(false);
  const { setImageData, getOrderedImages } = useImageStore();
  const orderedImages = getOrderedImages();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

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
      <Switch />
      <div className="flex justify-center w-full ">

      <div className="z-50">
          <Background isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className="fixed w-[88%] mx-auto max-w-[90.75rem] top-14 justify-end flex items-center mix-blend-difference z-50">
          <DropDonwn setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>

        <div className="absolute hidden">
          <Navbar />
        </div>

        <div className="absolute top-12 left-[11.5%] hover:scale-125 transition-all duration-300">
          <Link href="/" className="cursor-none">
            <div className="p-4">
              <ChevronLeft className="size-10 text-black dark:text-white" />
            </div>
          </Link>
        </div>
      </div>

      <div className="md:w-[23%] w-40 flex md:pt-[0rem] absolute md:relative left-[15%] top-32 justify-between">
        <div className="mt-[4rem] text-[#8B8B8B] md:text-[1rem] text-sm">
          <Link
            href="/gallery"
            className="text-[#8B8B8B] cursor-none mr-10 tracking-[.3rem]"
          >
            COMMERCIAL
          </Link>
        </div>
        <div className="mt-[4rem] md:text-[1rem] text-sm">
          <Link
            href="/gallery/raw"
            className="text-black dark:text-color1 cursor-none tracking-[.3rem]"
          >
            RAW
          </Link>
        </div>
      </div>

      <section className="w-[88%] mx-auto max-w-[125.75rem]">
        <section className="w-full h-auto mb-[5rem] mt-60">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orderedImages.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden relative w-[100%] aspect-[3/2]"
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Image ${image.id}`}
                  className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                  draggable={false}
                  width={1000}
                  height={1000}
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
