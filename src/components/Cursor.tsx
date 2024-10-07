"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };


    window.addEventListener("mousemove", handleMouseMove);

    return () => {

      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
 
    gsap.to(circlePosition, {
      x: cursorPosition.x - 15, 
      y: cursorPosition.y - 15,
      duration: 0.2,
      onUpdate: () => {
        setCirclePosition({
          x: Number(gsap.getProperty(circlePosition, "x")),
          y: Number(gsap.getProperty(circlePosition, "y")),
        });
      },
    });
  }, [cursorPosition]);

  return (
    <div
      className="custom-cursor"
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
      }}
    />
  );
};

export default CustomCursor;
