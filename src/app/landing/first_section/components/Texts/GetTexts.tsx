import { useTextStore } from "../../store/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/FetchText";
import { gsap } from "gsap";
import { useLanguage } from "@/components/navbar/Navbar";

export const GetTexts = () => {
  const { title, body, setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();

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

  const textRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    if (bodyRef.current) {
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <>
      <h2
        className="font-[HelveticaExtraBold] text-3xl sm:text-6xl text-right"
        ref={textRef}
      >
      {title}
      </h2>
      <p
        className="sm:text-[1rem] text-sm pt-[4rem] tracking-[.3rem] font-[HelveticaLight] w-auto lg:w-[38rem] text-justify"
        ref={bodyRef}
      >
        {body}
      </p>
    </>
  );
};
