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
import {
  fetchImagesUrl,
  uploadFileImage,
  deleteImage,
} from "../hooks/FetchImages";
import { useImageStore } from "../store/UseImageGallery";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface Props {
  id: string;
  width: number;
  height: number;
}

export const DialogImageGallery = ({ id, width, height }: Props) => {
  const { setImageData } = useImageStore();

  useEffect(() => {
    console.log(id);
  });

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.picture as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) return;

    const uploadPromise = uploadFileImage(file, id).then(async () => {
      const updatedImages = await fetchImagesUrl();

      if (updatedImages) {
        setImageData(updatedImages);
      }
    });

    toast
      .promise(uploadPromise, {
        pending: "Reemplazando imagen...",
        success: "Imagen reemplazada con éxito",
        error: "Error al reemplazar la imagen",
      })
      .catch((error) => {
        console.error("Error al reemplazar la imagen:", error); // Imprimir el error si ocurre
      });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteImage(id);
      const updatedImages = await fetchImagesUrl();

      if (updatedImages) {
        setImageData(updatedImages);
      }
      toast.success("Se borro la imagen");
    } catch (error) {
      console.error("Error al borrar la imagen:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-[#29292965] absolute top-[0] right-0 cursor-pointer z-10 flex items-center justify-center h-14 w-14">
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
            {height} px de alto y {width} px de ancho.
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
          <button
            className="text-color1 bg-red-600 dark:bg-red-600 p-3 rounded-lg w-full mt-4"
            onClick={() => handleDelete(id)}
          >
            Borrar imagen
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
