export const fetchTitles = async (
  language: "en" | "es"
): Promise<string[] | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/texts/products-services-titles/${language}`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener los títulos:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error general:", error);
    return null;
  }
};
