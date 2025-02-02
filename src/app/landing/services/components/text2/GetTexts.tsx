import { useTextStore } from "../../store/Texts/text2/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/Texts/text2/FetchText";
import { gsap } from "gsap";
import { useLanguage } from "@/components/navbar/Navbar";

export const GetTexts2 = ({
  placement,
}: {
  placement: "trigger" | "content";
}) => {
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
            start: "top 100%",
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
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 30%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  if (placement === "trigger") {
    return (
      <h2
        className="sm:text-[1rem] text-sm tracking-[.3rem] mb-2 text-left"
        ref={textRef}
      >
        {title}
      </h2>
    );
  }

  return (
    <>
      <p
        className="md:text-[1rem] text-[0.95rem] text-[#8B8B8B] text-left"
        ref={bodyRef}
      >
        {body}
      </p>
    </>
  );
};
