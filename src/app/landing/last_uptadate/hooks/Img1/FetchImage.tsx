
export const fetchImageUrl = async (): Promise<string | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/images/6703ddcb3c3e719b7c76110f`
      );
  
      if (response.ok) {
        const data = await response.json();
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


  export const uploadFileImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", "1");
    formData.append("subsection", "1");
  
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/6703ddcb3c3e719b7c76110f`,
      {
        method: "PATCH",
        body: formData,
      }
    );
  
    if (!response.ok) {
      throw new Error("Error al reemplazar la imagen");
    }
  
    const data = await response.json();
    return data;
  };