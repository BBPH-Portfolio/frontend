import { useTextStore } from "../../store/textRight/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/textRight/FetchText";
import { gsap } from "gsap";
import { useLanguage } from "@/components/Navbar";

export const GetText = () => {
  const { title, setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();
  const scrollTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loadText = async () => {
      let data;

      if (Spanish) {
        data = await fetchTextEs();
      } else {
        data = await fetchTextEn();
      }

      if (data) {
        setTitle(data.title);
        setBody(data.body);
      }
    };

    loadText();
  }, [Spanish]);

  useEffect(() => {
    if (scrollTextRef.current) {
      gsap.set(scrollTextRef.current, { y: "100%", opacity: 0 });
      gsap.to(scrollTextRef.current, {
        y: "0%",
        opacity: 1,
        delay: 1,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <>
      <span
        ref={scrollTextRef}
        className="absolute text-[#8B8B8B] right-0 text-right top-[30%] xl:top-[50%] overflow-hidden font-[HelveticaThinItalic] tracking-[.1rem] w-36"
      >
        {title}
      </span>
    </>
  );
};
