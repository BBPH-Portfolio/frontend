export const fetchImageUrl = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/6703efadb3493fa160767702`
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

export const fetchImageUrl2 = async (): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/691530c66155dfb2a224a8c0`
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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/images/6703efadb3493fa160767702`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al reemplazar la imagen");
  }

  const data = await response.json();
  return data;
};

export const uploadFileImage2 = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("section", "1");
  formData.append("subsection", "1");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/images/691530c66155dfb2a224a8c0`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al reemplazar la imagen");
  }

  const data = await response.json();
  return data;
};
