import { create } from "zustand";

interface TextState {
  title: string;
  body: string;
  languague: string;
  id: string;
  setTitle: (title: string) => void;
  setBody: (body: string) => void;
  setId: (id: string) => void;
}

export const useTextStore = create<TextState>((set) => ({
  title: "",
  body: "",
  languague: "",
  id: "",
  setTitle: (title: string) => set({ title }),
  setBody: (body: string) => set({ body }),
  setId: (id: string) => set({ id }),
}));