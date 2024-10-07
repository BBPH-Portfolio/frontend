export const fetchTextEn = async (): Promise<{
    title: string;
    body: string;
    languague: string;
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/texts/by-id/670367b2a8702f320bc4b4e8`
      );
  
      if (response.ok) {
        const data = await response.json();
        return { title: data.title, body: data.body, languague: data.languague };
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
  } | null> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/texts/by-id/67036951a8702f320bc4b4ea`
      );
  
      if (response.ok) {
        const data = await response.json();
        return { title: data.title, body: data.body, languague: data.languague };
      } else {
        console.error("Error al obtener el texto:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error general:", error);
      return null;
    }
  };
  
  export const uploadFileTextEn = async (title: string, body: string) => {
    const payload: { title?: string; body?: string } = {};
  
    if (title) payload.title = title;
    if (body) payload.body = body;
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/texts/670367b2a8702f320bc4b4e8`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
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
  
  export const uploadFileTextEs = async (title: string, body: string) => {
    const payload: { title?: string; body?: string } = {};
  
    if (title) payload.title = title;
    if (body) payload.body = body;
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/texts/67036951a8702f320bc4b4ea`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
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
  