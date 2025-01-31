import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import {
  uploadFileTextEn,
  uploadFileTextEs,
} from "../../hooks/Texts/text2/FetchText";
import { useTextStore } from "../../store/Texts/text2/UseText";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/navbar/Navbar";
import { DialogTextProps } from "../text1/DialogText";
import { uploadFileImageServices } from "../../hooks/FetchImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const DialogText2: React.FC<DialogTextProps> = ({ imageId }) => {
  const { setTitle, setBody } = useTextStore();
  const { Spanish } = useLanguage();

  const handleTextUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const titleFetch = formData.get("titleFetch") as string;
    const bodyFetch = formData.get("bodyFetch") as string;

    if (!titleFetch && !bodyFetch) {
      toast.error("Debes proporcionar al menos un campo para actualizar");
      return;
    }

    let UploadText;

    if (Spanish) {
      UploadText = uploadFileTextEs;
    } else {
      UploadText = uploadFileTextEn;
    }

    try {
      const data = await UploadText(titleFetch, bodyFetch);

      if (data.title) setTitle(data.title);
      if (data.body) setBody(data.body);

      toast.success("Texto reemplazado con éxito");
    } catch (error) {
      console.error("Error al reemplazar el texto:", error);
      toast.error("Error al reemplazar el texto");
    }
  };

    const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fileInput = e.currentTarget.picture as HTMLInputElement;
      const file = fileInput.files?.[0];
  
      if (!file || !imageId) return;
  
      const uploadPromise = uploadFileImageServices(file, imageId);
  
      toast.promise(uploadPromise, {
        pending: "Reemplazando imagen...",
        success: "Imagen reemplazada con éxito",
        error: "Error al reemplazar la imagen",
      });
    };
  

  return (
    <Dialog>
    <DialogTrigger asChild>
      <div className="bg-[#29292965] absolute top-0 right-0 cursor-pointer z-10 flex items-center justify-center h-14 w-14">
        <Pencil className="text-white w-10" />
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] text-black dark:text-color1">
      <DialogHeader>
        <DialogTitle className="pb-3 text-center">
          Editar Contenido
        </DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="text">Textos</TabsTrigger>
          <TabsTrigger value="image">Imagen</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <DialogDescription className="mb-4">
            Ten en cuenta que estás a punto de reemplazar los textos, no podrás
            deshacer esta acción.
            <br />
            <br />
            Puedes editar solo un texto o ambos.
            <br />
            Los caracteres máximos son:
            titulo: 20 caracteres, body: 60 caracteres.
          </DialogDescription>
          
          <form onSubmit={handleTextUpload}>
            <label htmlFor="titleFetch">Titulo:</label>
            <Input
              name="titleFetch"
              placeholder="Reemplazar titulo..."
              className="mb-5 mt-2"
              type="text"
              maxLength={20}
              id="titleFetch"
            />
            <label htmlFor="bodyFetch">Body:</label>
            <textarea
              name="bodyFetch"
              placeholder="Reemplazar body..."
               className="mb-5 mt-2 w-full p-2 border rounded-lg resize-y min-h-[100px] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              maxLength={60}
              id="bodyFetch"
            />
            <button
              className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
              type="submit"
            >
              Reemplazar texto
            </button>
          </form>
        </TabsContent>

        <TabsContent value="image">
          <DialogDescription className="mb-4">
            Ten en cuenta que estás a punto de reemplazar la imagen, no podrás
            deshacer esta acción.
            <br />
            <br />
            Las medidas de la nueva imagen deben ser:
            784 px de alto y 435 px de ancho.
          </DialogDescription>

          <form onSubmit={handleFileUpload}>
            <Input
              id="picture"
              type="file"
              className="cursor-pointer h-10 p-2 mb-5"
              accept="image/*"
            />
            <button
              className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
              type="submit"
            >
              Reemplazar imagen
            </button>
          </form>
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
  );
};
