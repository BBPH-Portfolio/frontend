import { useTextStore } from "../../store/title/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/title/FetchText";
import { useLanguage } from "@/components/navbar/Navbar";
import { gsap } from "gsap";

export const GetTextTitle = () => {
  const { title, setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTextRef = useRef<HTMLSpanElement>(null);
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
    const titleSpans = titleRef.current?.querySelectorAll("span");

    if (titleSpans) {
      gsap.set(titleSpans, { y: "100%", opacity: 0 });
      gsap.to(titleSpans, {
        y: "0%",
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power3.out",
      });
    }

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
      <h1
        className="Title text-[2.5rem] xl:text-[7rem] sm:text-[4.5rem] text-black dark:text-color1 font-[HelveticaExtraBold] overflow-hidden text-center"
        ref={titleRef}
      >
        <span className="block overflow-hidden">
          <span> {title}</span>
        </span>
      </h1>
    </>
  );
};
