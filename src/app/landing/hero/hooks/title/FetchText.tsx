export const fetchTextEn = async (): Promise<{
  title: string;
  body: string;
  languague: string;
  id: string;
} | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/texts/random/hero/en`);

    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title,
        body: data.body || "",
        languague: data.language,
        id: data._id,
      };
    } else {
      console.error("Error al obtener el texto:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error general:", error);
    return null;
  }
};

export const fetchTextEs = async (): Promise<{
  title: string;
  body: string;
  languague: string;
  id: string;
} | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/texts/random/hero/es`);

    if (response.ok) {
      const data = await response.json();
      return {
        title: data.title,
        body: data.body || "",
        languague: data.language,
        id: data._id,
      };
    } else {
      console.error("Error al obtener el texto:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error general:", error);
    return null;
  }
};

export const uploadFileTextEn = async (
  title: string,
  body: string,
  id: string
) => {
  const payload: { title?: string; body?: string } = {};

  if (title) payload.title = title;
  if (body) payload.body = body;

  if (!id) {
    throw new Error("ID del texto no disponible");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/texts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al reemplazar el texto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en uploadFileText:", error);
    throw error;
  }
};

export const uploadFileTextEs = async (
  title: string,
  body: string,
  id: string
) => {
  const payload: { title?: string; body?: string } = {};

  if (title) payload.title = title;
  if (body) payload.body = body;

  if (!id) {
    throw new Error("ID del texto no disponible");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    throw new Error("Token de autenticación no disponible");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/texts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al reemplazar el texto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en uploadFileText:", error);
    throw error;
  }
};
