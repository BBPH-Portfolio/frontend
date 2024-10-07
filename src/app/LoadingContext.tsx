'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  hasLoaded: boolean;
  setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}>({ 
  isLoading: true, 
  setIsLoading: () => {}, 
  hasLoaded: false, 
  setHasLoaded: () => {} 
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadedBefore = localStorage.getItem("hasLoaded") === "true";
    if (!loadedBefore) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setHasLoaded(true);
        localStorage.setItem("hasLoaded", "true");
      }, 5500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, hasLoaded, setHasLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);