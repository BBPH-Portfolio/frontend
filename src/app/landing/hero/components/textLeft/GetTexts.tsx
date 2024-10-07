import { useTextStore } from "../../store/textLeft/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/textLeft/FetchText";
import { gsap } from "gsap";
import { useLanguage } from "@/components/Navbar";

export const GetTextLeft = () => {
  const { title, setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();
  const servicesTextRef = useRef<HTMLSpanElement>(null);

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
    if (servicesTextRef.current) {
      gsap.set(servicesTextRef.current, { y: "100%", opacity: 0 });
      gsap.to(servicesTextRef.current, {
        y: "0%",
        opacity: 1,
        delay: 1.5,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <>
      <span
        ref={servicesTextRef}
        className="w-44 absolute text-[#8B8B8B] left-[0rem] bottom-32 overflow-hidden font-[HelveticaThinItalic] tracking-[.1rem]"
      >
        {title}
      </span>
    </>
  );
};
