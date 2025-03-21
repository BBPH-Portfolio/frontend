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

interface IStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useStoreLoading = create<IStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export default function Home() {
  const { loading, setLoading } = useStoreLoading();
  const { mixBlend } = useMixBlend();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (!hasLoaded) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 4000);
    } else {
      setLoading(false);
    }

    const handleBeforeUnload = () => {
      sessionStorage.removeItem("hasLoaded");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [setLoading]);

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
