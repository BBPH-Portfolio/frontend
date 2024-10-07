"use client";

import React, { useState, useEffect } from "react";

const PageTransition = ({ children, isChanging }:  { children: React.ReactNode; isChanging: boolean }) => {

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isChanging) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Duración total de la animación
      return () => clearTimeout(timer);
    }
  }, [isChanging]);

  return (
    <div className="page-transition-wrapper">
      {children}
      {isAnimating && (
        <div className="transition-overlay">
          <div className="transition-slice"></div>
          <div className="transition-slice"></div>
          <div className="transition-slice"></div>
        </div>
      )}

      <style jsx>{`
        .page-transition-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .transition-overlay {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100vh;
          display: flex;
          animation: slideIn 0.5s forwards, slideOut 0.5s 0.5s forwards;
        }
        .transition-slice {
          flex: 1;
          background-color: #007ae5; // Puedes cambiar este color
        }
        .transition-slice:nth-child(2) {
          animation-delay: 0.1s;
        }
        .transition-slice:nth-child(3) {
          animation-delay: 0.2s;
        }
        @keyframes slideIn {
          from {
            right: -100%;
          }
          to {
            right: 0;
          }
        }
        @keyframes slideOut {
          from {
            right: 0;
          }
          to {
            right: 100%;
          }
        }
        ${isAnimating
          ? `
          .page-transition-wrapper > *:not(.transition-overlay) {
            animation: pushContent 0.5s forwards;
          }
          @keyframes pushContent {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
        `
          : ""}
      `}</style>
    </div>
  );
};

export default PageTransition;
