  import { create } from "zustand";

  interface IMixBlend {
    mixBlend: boolean;
    setMixBlend: (mixBlend: boolean) => void;
  }

  export const useMixBlend = create<IMixBlend>((set) => ({
    mixBlend: true,
    setMixBlend: (mixBlend: boolean) => {
      set(() => ({ mixBlend }));
    },
  }));