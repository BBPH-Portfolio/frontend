"use client";
import Navbar from "../components/navbar/Navbar";
import Footer from "./landing/footer/Footer";
import HeroSection from "./landing/hero/HeroSection";
import LandScapeSection from "./landing/land_scape/LandScapeSection";
import LastUpdates from "./landing/last_uptadate/LastUpdates";
import PictureSection from "./landing/first_section/PictureSection";
import ServiceSection from "./landing/services/ServiceSection";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { useMixBlend } from "@/store/store";
import DropDonwn from "@/components/navbar/DropDonwn";
import Switch from "@/components/Switch";
import Background from "@/components/navbar/Background";
import { useHeroVideoPreload } from "@/lib/heroVideo";

interface IStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useStoreLoading = create<IStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

/** Duracion minima de la animacion de la pantalla de carga. */
const MIN_LOADER_MS = 4000;
/** Tope maximo esperando el video, para no bloquear en conexiones lentas. */
const MAX_LOADER_MS = 12000;

export default function Home() {
  const { loading, setLoading } = useStoreLoading();
  const { mixBlend } = useMixBlend();
  const [isOpen, setIsOpen] = useState(false);

  // Empieza a descargar el video del hero desde el primer render, es decir,
  // mientras corre la animacion de la pantalla de carga.
  const isVideoReady = useHeroVideoPreload();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [maxTimeElapsed, setMaxTimeElapsed] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasLoaded");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (hasLoaded) {
      setLoading(false);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }

    setLoading(true);

    const minTimer = setTimeout(() => setMinTimeElapsed(true), MIN_LOADER_MS);
    const maxTimer = setTimeout(() => setMaxTimeElapsed(true), MAX_LOADER_MS);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setLoading]);

  // Sale de la pantalla de carga cuando termino la animacion y el video ya se
  // puede reproducir (o cuando se agoto el tiempo maximo de espera).
  useEffect(() => {
    if (!minTimeElapsed) return;
    if (!isVideoReady && !maxTimeElapsed) return;

    setLoading(false);
    sessionStorage.setItem("hasLoaded", "true");
  }, [minTimeElapsed, isVideoReady, maxTimeElapsed, setLoading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Switch />

      <div className="flex justify-center w-full">
        <div className="z-50">
          <Background isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        <div className="fixed w-[88%] mx-auto max-w-[90.75rem] top-14 justify-end flex items-center mix-blend-difference z-50">
          <DropDonwn setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>

        <div
          className={`z-[1] fixed w-[88%] mx-auto max-w-[90.75rem] justify-end flex items-end   ${
            mixBlend ? "mix-blend-difference" : ""
          }`}
        >
          <Navbar />
        </div>
      </div>
      <div className="w-[88%] mx-auto max-w-[90.75rem]">
        <HeroSection />
        <PictureSection />
      </div>
      <LandScapeSection />
      <div className="w-[88%] mx-auto max-w-[90.75rem]">
        <section id="services">
          <ServiceSection />
        </section>
      </div>
      <section id="updates">
        <LastUpdates />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
}
