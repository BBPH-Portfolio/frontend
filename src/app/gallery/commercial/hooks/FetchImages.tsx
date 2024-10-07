export interface ImageData {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ImageData2 {
  _id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export const fetchImagesUrl = async (): Promise<ImageData[] | null> => {
  try {
    const response = await fetch("http://localhost:3000/categories/Commercial");
    if (response.ok) {
      const data = await response.json();

      const images: ImageData[] = data.images.map((image: ImageData2) => ({
        id: image._id,
        url: image.url,
        alt: image.alt,
        width: image.width,
        height: image.height,
      }));
      return images;
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

  try {
    const response = await fetch(`http://localhost:3000/images/${id}`, {
      method: "PATCH",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la imagen: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Devuelve la respuesta del backend
  } catch (error) {
    console.error("Error al actualizar la imagen:", error);
    throw error;
  }
};

export const deleteImage = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/categories/Commercial/image/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(`Error al eliminar la imagen: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
};

export const AddImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alt", "nueva imagen");

  try {
    const response = await fetch(
      `http://localhost:3000/categories/Commercial/image/`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error(`Error al cargar la imagen: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error al cargar una nueva imagen:", error);
    throw error;
  }
};
