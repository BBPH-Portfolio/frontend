import { create } from "zustand";

interface TitlesState {
  titles: string[];
  setTitles: (titles: string[]) => void;
}

export const useTitlesStore = create<TitlesState>((set) => ({
  titles: [],
  setTitles: (titles: string[]) => set({ titles }),
}));
