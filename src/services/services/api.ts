// services/api.ts

export type Menu = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
};

export async function fetchMenus(): Promise<Menu[]> {
  try {
    const res = await fetch("https://giomr.site/api/restaurant/categories/la-espanolita");

    if (!res.ok) {
      throw new Error(`Error al obtener menús: ${res.statusText}`);
    }

    const data = await res.json();

    // Asegurate de mapear la respuesta si la estructura es diferente
    return data.menus || data;
  } catch (error) {
    console.error("Error en fetchMenus:", error);
    return [];
  }
}
