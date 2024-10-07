import { create } from "zustand";

interface ImageState {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export const useImageStore = create<ImageState>()((set) => ({
  imageUrl: "",
  setImageUrl: (url: string) => set({ imageUrl: url }),
}));
