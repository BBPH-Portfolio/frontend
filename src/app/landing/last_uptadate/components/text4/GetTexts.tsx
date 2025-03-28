import { useTextStore } from "../../store/text4/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/text4/FetchText";
import { gsap } from "gsap";
import { useLanguage } from "@/components/navbar/Navbar";

export const GetTexts4 = () => {
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
      <div className="h-auto pb-10 mt-20">
        <h3
          className="text-xl sm:text-[1.7rem] font-[HelveticaExtraBold]"
          ref={textRef}
        >
          {title}
        </h3>
      </div>
      <p
        className="text-sm sm:text-[1rem] break-words text-justify"
        ref={bodyRef}
      >
        {body}
      </p>
    </>
  );
};
