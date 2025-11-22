import { useTextStore } from "../../store/UseText";
import { useEffect, useRef } from "react";
import { fetchTextEn, fetchTextEs } from "../../hooks/FetchText";
import { gsap } from "gsap";
import { useLanguage } from "@/components/navbar/Navbar";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const GetTexts = () => {
  const { title, body, setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const loadText = async () => {
      const data = Spanish ? await fetchTextEs() : await fetchTextEn();
      if (data) {
        setTitle(data.title);
        setBody(data.body);
      }
    };
    loadText();
  }, [Spanish]);

  useEffect(() => {
    if (!bodyRef.current || !body) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const text = bodyRef.current.innerText;
    const words = text.split(' ');
    
    bodyRef.current.innerHTML = words
      .map(word => `<span class="word">${word} </span>`)
      .join('');

    const wordSpans = bodyRef.current.querySelectorAll('.word');
    
    gsap.set(wordSpans, { filter: "blur(8px)", opacity: 0.6 });

    wordSpans.forEach((word) => {
      gsap.to(word, {
        filter: "blur(0px)",
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: word,
          start: "top 100%",
          end: "top 85%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [body]);

  return (
    <>
      <div className="pb-36">
        <p className="sm:text-6xl text-3xl font-[HelveticaExBold] text-right">
          {title}
        </p>
      </div>
      <p
        ref={bodyRef}
        className="text-[0.95rem] sm:text-[1.3rem] text-justify break-words will-change-transform"
      >
        {body}
      </p>
    </>
  );
};