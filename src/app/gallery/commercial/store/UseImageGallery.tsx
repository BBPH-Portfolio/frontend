import { create } from "zustand";
import { ImageData } from "../hooks/FetchImages";
import { persist } from "zustand/middleware";

interface ImageState {
    image: ImageData[];
    imageOrder: string[];
    setImageData: (images: ImageData[]) => void;
    getOrderedImages: () => ImageData[];
  }


export const useImageStore = create<ImageState>()(
  persist(
    (set, get) => ({
      image: [],
      imageOrder: [],
      setImageData: (images: ImageData[]) => {
        const currentOrder = get().imageOrder;
        const newOrder = images.map((img) => img.id);

        const updatedOrder = [
          ...currentOrder.filter((id) => newOrder.includes(id)),
          ...newOrder.filter((id) => !currentOrder.includes(id)),
        ];

        set({ image: images, imageOrder: updatedOrder });
      },
      getOrderedImages: () => {
        const { image, imageOrder } = get();
        return imageOrder
          .map((id) => image.find((img) => img.id === id))
          .filter((img): img is ImageData => img !== undefined);
      },
    }),
    {
      name: "image-storage",
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);
