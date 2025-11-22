import { useTextStore } from "../store/UseText";
import { useEffect } from "react";
import { fetchTextEn, fetchTextEs } from "../hooks/FetchText";
import { useLanguage } from "@/components/navbar/Navbar";

export const GetTexts = () => {
  const { title, body, setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();

  useEffect(() => {
    const loadText = async () => {
      const data = Spanish ? await fetchTextEs() : await fetchTextEn();
      if (data) {
        setTitle(data.title);
        setBody(data.body);
      }
    };
    loadText();
  }, [Spanish, setTitle, setBody]);

  return (
    <>
      <h3 className="sm:text-6xl text-3xl font-[HelveticaExBold]">
        {title}
      </h3>
      <p className="text-[0.95rem] sm:text-[1.3rem] text-justify break-words mt-10">
        {body}
      </p>
    </>
  );
};

