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

  return (
    <span className="text-2xl md:text-4xl sm:mr-5 mr-0 font-[HelveticaHairline] tracking-[2px] inline-block w-[14rem] text-center">
      {time}
    </span>
  );
};

export default TimeDisplay;
