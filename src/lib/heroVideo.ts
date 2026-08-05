"use client";

import { useEffect, useState } from "react";

export const HERO_VIDEO_SRC = "/background-video.mp4";

let videoElement: HTMLVideoElement | null = null;

/**
 * Devuelve el mismo elemento <video> durante toda la sesion. Se crea (y empieza
 * a descargarse) la primera vez que se pide, aunque todavia no este montado en
 * el DOM, para que la pantalla de carga y la descarga del video ocurran en
 * paralelo.
 */
export const getHeroVideo = () => {
  if (typeof window === "undefined") return null;

  if (!videoElement) {
    videoElement = document.createElement("video");
    videoElement.src = HERO_VIDEO_SRC;
    videoElement.preload = "auto";
    videoElement.loop = true;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.defaultMuted = true;
    videoElement.playsInline = true;
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("aria-hidden", "true");
    videoElement.className = "w-full h-full object-cover";
    videoElement.load();
  }

  return videoElement;
};

/**
 * Arranca la descarga del video y avisa cuando ya se puede reproducir sin
 * cortes. Si el video falla, devuelve `true` igualmente para no dejar al
 * usuario atrapado en la pantalla de carga.
 */
export const useHeroVideoPreload = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = getHeroVideo();
    if (!video) return;

    if (video.readyState >= 4) {
      setIsReady(true);
      return;
    }

    const markReady = () => setIsReady(true);

    video.addEventListener("canplaythrough", markReady);
    video.addEventListener("error", markReady);

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("error", markReady);
    };
  }, []);

  return isReady;
};
