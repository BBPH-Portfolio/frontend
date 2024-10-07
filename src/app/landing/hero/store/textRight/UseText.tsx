import { create } from "zustand";

interface TextState {
  title: string;
  body: string;
  languague: string
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
}

export const useTextStore = create<TextState>((set) => ({
  title: "",
  body: "",
  languague: "",
  setTitle: (title: string) => set({ title }),
  setBody: (body: string) => set({ body }),
}));