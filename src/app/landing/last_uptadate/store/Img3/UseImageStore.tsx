import { create } from "zustand";


interface ImageState {
  imageUrl: string;
  imageLink: string;
  setImageData: (url: string, link: string) => void;
}

export const useImageStore = create<ImageState>()((set) => ({
  imageUrl: "",
  imageLink: "",
  setImageData: (url: string, link: string) => set({ imageUrl: url, imageLink: link }),
}));
