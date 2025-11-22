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
import { uploadFileImage, uploadFileImage2 } from "../../hooks/FetchImage";
import { useImageStore } from "../../store/UseImageStore";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DialogImage = () => {
  const { setImageUrl, setImageUrl2 } = useImageStore();

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
        const errorMessage =
          error instanceof Error ? error.message : "Error al reemplazar la imagen";
        toast.error(errorMessage);
      });
  };

  const handleFileUpload2 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = e.currentTarget.picture2 as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (!file) return;

    const uploadPromise = uploadFileImage2(file).then((data) => {
      setImageUrl2(data.url);
    });

    toast
      .promise(uploadPromise, {
        pending: "Reemplazando imagen...",
        success: "Imagen reemplazada con éxito",
        error: "Error al reemplazar la imagen",
      })
      .catch((error) => {
        console.error("Error al reemplazar la imagen:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Error al reemplazar la imagen";
        toast.error(errorMessage);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-[#29292965] absolute top-0 right-0 cursor-pointer z-10 flex items-center justify-center h-14 w-14">
          <Pencil className="text-white w-10" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black dark:text-color1 cursor-default">
        <DialogHeader>
          <DialogTitle className="pb-3 text-center">
            Reemplazar imágenes
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="image1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image1">Imagen 1</TabsTrigger>
            <TabsTrigger value="image2">Imagen 2</TabsTrigger>
          </TabsList>

          <TabsContent value="image1">
            <DialogDescription className="mb-4">
              Ten en cuenta que estás a punto de reemplazar la primera imagen, no
              podrás deshacer esta acción. <br /> <br />
              Las medidas de la nueva imagen deben ser: <br />
              3300 px de alto y 2700 px de ancho.
            </DialogDescription>
            <form onSubmit={handleFileUpload}>
              <Input
                id="picture"
                name="picture"
                type="file"
                className="cursor-pointer h-10 p-2 my-5"
                accept="image/*"
              />
              <button
                className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
                type="submit"
              >
                Reemplazar imagen 1
              </button>
            </form>
          </TabsContent>

          <TabsContent value="image2">
            <DialogDescription className="mb-4">
              Ten en cuenta que estás a punto de reemplazar la segunda imagen (hover), no
              podrás deshacer esta acción. <br /> <br />
              Las medidas de la nueva imagen deben ser: <br />
              3300 px de alto y 2700 px de ancho.
            </DialogDescription>
            <form onSubmit={handleFileUpload2}>
              <Input
                id="picture2"
                name="picture2"
                type="file"
                className="cursor-pointer h-10 p-2 my-5"
                accept="image/*"
              />
              <button
                className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
                type="submit"
              >
                Reemplazar imagen 2
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
