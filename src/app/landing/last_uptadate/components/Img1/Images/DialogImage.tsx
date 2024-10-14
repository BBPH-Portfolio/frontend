"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { uploadFileImage, updateImageLink } from "../../../hooks/Img1/FetchImage";
import { useImageStore } from "../../../store/Img1/UseImageStore";
import { toast } from "react-toastify";
import { useState } from "react";

export const DialogImage = () => {
  const { setImageData, imageLink } = useImageStore();
  const [link, setLink] = useState(imageLink);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.picture as HTMLInputElement;
    const file = fileInput.files?.[0];

    let uploadPromise;

    if (file) {
      uploadPromise = uploadFileImage(file, link).then((data) => {
        setImageData(data.url, data.link || link);
      });
    } else if (link !== imageLink) {
      uploadPromise = updateImageLink(link).then((data) => {
        setImageData(data.url, data.link);
      });
    } else {
      return;
    }

    toast
      .promise(uploadPromise, {
        pending: "Actualizando datos...",
        success: "Datos actualizados con éxito",
        error: "Error al actualizar los datos",
      })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-[#29292965] absolute top-0 right-0 cursor-pointer flex items-center justify-center h-14 w-14 z-50">
          <Pencil className="text-white w-10" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black dark:text-color1 cursor-default">
        <DialogHeader>
          <DialogTitle className="pb-3 text-center">
            Actualizar imagen
          </DialogTitle>
          <DialogDescription>
            Puedes reemplazar la imagen, actualizar el enlace, o ambos. <br /> <br />
            Las medidas de la nueva imagen deben ser: <br />
            160 px de alto y 240 px de ancho. <br/>
            Para actualizar el Link, ten en cuenta que tiene que tener el formato completo ejemplo: https://


          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            id="picture"
            type="file"
            className="cursor-pointer h-10 p-2 my-5"
          />
          <Input
            id="link"
            type="url"
            placeholder="Ingrese el enlace asociado"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="h-10 p-2 my-5"
          />
          <button
            className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
            type="submit"
          >
            Actualizar imagen
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
