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
} from "../../hooks/textRight/FetchText";
import { useTextStore } from "../../store/textRight/UseText";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/Navbar";

const DialogText: React.FC = () => {
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
      console.log("Datos recibidos:", data);

      if (data.title) setTitle(data.title);
      if (data.body) setBody(data.body);

      toast.success("Texto reemplazado con éxito");
    } catch (error) {
      console.error("Error al reemplazar el texto:", error);
      toast.error("Error al reemplazar el texto");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-[#29292965] absolute top-[23rem] right-0 cursor-pointer z-10 flex items-center justify-center h-14 w-14">
          <Pencil className="text-white w-10" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black dark:text-color1">
        <DialogHeader>
          <DialogTitle className="pb-3 text-center">
            Reemplazar textos
          </DialogTitle>
          <DialogDescription>
            Ten en cuenta que estás a punto de reemplazar los textos, no podrás
            deshacer esta acción.
            <br />
            <br />
            Puedes editar solo un texto o por el contrario, ambos.
            <br />
            <br />
            Los caracteres máximos de cada texto son:
            <br />
            titulo: 35 caracteres
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleTextUpload}>
          <label htmlFor="titleFetch">Titulo:</label>
          <Input
            name="titleFetch"
            placeholder="Reemplazar titulo..."
            className="mb-5 mt-2"
            type="text"
            maxLength={35}
            id="titleFetch"
          />
          <button
            className="text-color1 dark:text-black bg-black dark:bg-white p-3 rounded-lg w-full"
            type="submit"
          >
            Reemplazar texto
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogText;
