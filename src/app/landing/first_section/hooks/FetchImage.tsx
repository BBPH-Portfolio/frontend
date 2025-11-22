import { create } from "zustand";

export interface ImageState {
  imageId: string | null;
  setImageId: (id: string) => void;
}

export const useImageStoreId = create<ImageState>((set) => ({
  imageId: null,
  setImageId: (id) => set({ imageId: id }),
}));

export const fetchImageUrl = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/random/hero`
    );

    if (response.ok) {
      const data = await response.json();

      const { setImageId } = useImageStoreId.getState();
      setImageId(data._id);

      return data.url;
    } else {
      console.error("Error al obtener la imagen:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error general:", error);
    return null;
  }
};

export const uploadFileImage = async (file: File, id: string) => {
  const formData = new FormData();
  formData.append("file", file);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/images/${id}`,
    {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error al reemplazar la imagen");
  }

  const data = await response.json();
  return data;
};
