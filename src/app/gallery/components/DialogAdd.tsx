"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { AddImage, fetchImagesUrl } from "../hooks/FetchImages";
import { useImageStore } from "../store/UseImageGallery";

export const DialogAdd = () => {
  const { setImageData } = useImageStore();

  const handleAddImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.picture as HTMLInputElement;
    const file = fileInput.files![0];

    if (!file) return;

    try {
      const response = await AddImage(file);

      toast.success("Imagen agregada con éxito");

      const updatedImages = await fetchImagesUrl();
      if (updatedImages) {
        setImageData(updatedImages);
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full h-full flex justify-center items-center">
          <Plus className="text-white w-16  h-16" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black dark:text-color1 cursor-default">
        <DialogHeader>
          <DialogTitle className="pb-3 text-center">
            Añadir nueva imagen
          </DialogTitle>
          <DialogDescription>
            Ten en cuenta que estás a punto de añadir una imagen. <br />
            Las medidas de la nueva imagen deben ser: <br />
            293px de alto y 208px de ancho.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddImage}>
          <Input
            id="picture"
            type="file"
            className="cursor-pointer h-10 p-2 my-5"
          />
          <button
            className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
            type="submit"
          >
            Añadir imagen
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
