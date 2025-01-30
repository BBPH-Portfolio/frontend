"use client"

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLandscape, setIsHoveringLandscape] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const checkLandscapeHover = () => {
      const landscapeSection = document.querySelector('.landscape-section');
      if (landscapeSection) {
        const rect = landscapeSection.getBoundingClientRect();
        const isHovering = 
          cursorPosition.x >= rect.left &&
          cursorPosition.x <= rect.right &&
          cursorPosition.y >= rect.top &&
          cursorPosition.y <= rect.bottom;
        setIsHoveringLandscape(isHovering);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", checkLandscapeHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkLandscapeHover);
    };
  }, [cursorPosition]);

  useEffect(() => {
    gsap.to(circlePosition, {
      x: cursorPosition.x - (isHoveringLandscape ? 30 : 15),
      y: cursorPosition.y - (isHoveringLandscape ? 30 : 15),
      duration: 0.2,
      onUpdate: () => {
        setCirclePosition({
          x: Number(gsap.getProperty(circlePosition, "x")),
          y: Number(gsap.getProperty(circlePosition, "y")),
        });
      },
    });
  }, [cursorPosition, isHoveringLandscape]);

  return (
    <div
      className="hidden custom-cursor xl:flex"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isHoveringLandscape ? "150px" : "30px",
        height: isHoveringLandscape ? "150px" : "30px",
        borderRadius: "50%",
        backgroundColor: "white",
        pointerEvents: "none",
        transform: `translate3d(${circlePosition.x}px, ${circlePosition.y}px, 0)`,
        zIndex: 9999,
        mixBlendMode: "difference",
        transition: "width 0.3s, height 0.3s",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: isHoveringLandscape ? "blur(5px)" : "blur(0px)",
      }}
    >
      {isHoveringLandscape && (
        <span className="hidden italic font-medium text-center text-black select-none md:block">
          keep scrolling down
        </span>
      )}
    </div>
  );
};

export default CustomCursor;