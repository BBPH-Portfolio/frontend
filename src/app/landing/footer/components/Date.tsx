"use client";

import { useEffect, useState } from "react";

const TimeDisplay = () => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const intervalId = setInterval(() => {
      const newTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Bogota",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(newTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!mounted) {
    return null;
  }

  return <span className="text-4xl mr-5 font-[HelveticaHairline] tracking-[2px]">{time}</span>;
};


export default TimeDisplay;