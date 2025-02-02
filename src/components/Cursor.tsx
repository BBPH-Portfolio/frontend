"use client"

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  
  const [cursorPosition, setCursorPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const [circlePosition, setCirclePosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const [textPosition, setTextPosition] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });

  const [isHoveringLandscape, setIsHoveringLandscape] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

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
        
        if (isHovering !== isHoveringLandscape) {
          setIsHoveringLandscape(isHovering);
          if (isHovering) {
            setTimeout(() => setTextVisible(true), 50);
          } else {
            setTextVisible(false);
          }
        }
      }
    };

    checkLandscapeHover();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", checkLandscapeHover);
    window.addEventListener("scroll", checkLandscapeHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkLandscapeHover);
      window.removeEventListener("scroll", checkLandscapeHover);
    };
  }, [cursorPosition, isHoveringLandscape]);

  useEffect(() => {
    gsap.to(circlePosition, {
      x: cursorPosition.x - (isHoveringLandscape ? 16 : 15),
      y: cursorPosition.y - (isHoveringLandscape ? 16 : 15),
      duration: 0.2,
      onUpdate: () => {
        setCirclePosition({
          x: Number(gsap.getProperty(circlePosition, "x")),
          y: Number(gsap.getProperty(circlePosition, "y")),
        });
      },
    });

   
    gsap.to(textPosition, {
      x: cursorPosition.x - (isHoveringLandscape ? 16 : 15),
      y: cursorPosition.y - (isHoveringLandscape ? 16 : 15),
      duration: 0.8, 
      ease: "power2.out",
      onUpdate: () => {
        setTextPosition({
          x: Number(gsap.getProperty(textPosition, "x")),
          y: Number(gsap.getProperty(textPosition, "y")),
        });
      },
    });
  }, [cursorPosition, isHoveringLandscape]);

  return (
    <>
      <div
        className="hidden custom-cursor xl:flex"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "30px",
          height: "30px",
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
      />
      {isHoveringLandscape && (
        <div 
          className="hidden fixed top-0 left-0 xl:block pointer-events-none mix-blend-difference"
          style={{
            transform: `translate3d(${textPosition.x}px, ${textPosition.y}px, 0)`,
            zIndex: 9999,
          }}
        >
          <span 
            className="italic font-medium text-center text-white select-none whitespace-nowrap"
            style={{
              transform: textVisible ? 'scale(1)' : 'scale(0)',
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
              opacity: textVisible ? 1 : 0,
              display: 'block',
              marginLeft: '-200px',
              marginTop: '2x',
            }}
          >
            keep scrolling down
          </span>
        </div>
      )}
    </>
  );
};

export default CustomCursor;

