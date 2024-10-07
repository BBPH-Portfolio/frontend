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
import { uploadFileImage } from "../../../hooks/Img1/FetchImage";
import { useImageStore } from "../../../store/Img1/UseImageStore";
import { toast } from "react-toastify";

export const DialogImage = () => {
  const { setImageUrl } = useImageStore();

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.picture as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) return;

    const uploadPromise = uploadFileImage(file).then((data) => {
      setImageUrl(data.url);
    });

    toast
      .promise(uploadPromise, {
        pending: "Reemplazando imagen...",
        success: "Imagen reemplazada con éxito",
        error: "Error al reemplazar la imagen",
      })
      .catch((error) => {
        console.error("Error al reemplazar la imagen:", error);
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
            Reemplazar imagen
          </DialogTitle>
          <DialogDescription>
            Ten en cuenta que estás a punto de reemplazar la imagen, no podrás
            deshacer esta acción. <br /> <br />
            Las medidas de la nueva imagen deben ser: <br />
            160 px de alto y 240 px de ancho.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFileUpload}>
          <Input
            id="picture"
            type="file"
            className="cursor-pointer h-10 p-2 my-5"
          />
          <button
            className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
            type="submit"
          >
            Reemplazar imagen
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
