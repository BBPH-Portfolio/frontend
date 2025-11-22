import { create } from "zustand";

interface ImageState {
  imageUrl: string;
  imageUrl2: string;
  setImageUrl: (url: string) => void;
  setImageUrl2: (url: string) => void;
}

export const useImageStore = create<ImageState>()((set) => ({
  imageUrl: "",
  imageUrl2: "",
  setImageUrl: (url: string) => set({ imageUrl: url }),
  setImageUrl2: (url: string) => set({ imageUrl2: url }),
}));
