"use client";

import { useEffect, useRef } from "react";
import { getHeroVideo } from "@/lib/heroVideo";

const BackgroundVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = getHeroVideo();
    if (!container || !video) return;

    container.appendChild(video);
    video.play().catch(() => {});

    return () => {
      if (video.parentElement === container) {
        container.removeChild(video);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen overflow-hidden pointer-events-none"
    />
  );
};

export default BackgroundVideo;
