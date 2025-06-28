"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import "./menus.scss";
import { ChipButtonsCategories } from "@/components/ChipButtonsCategories/ChipButtonsCategories";

interface IMenu {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ICategory {
  id: number;
  name: string;
  slug: string;
  order: number;
  description: string;
  thumbnail: string;
  menus: IMenu[];
}

export default function MenusPage() {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const loadAllMenus = async () => {
    try {
      const res = await axiosInstance.get<ICategory[]>("/restaurant/categories/la-espanolita");
      setCategories(res.data);
    } catch (err) {
      console.error("Error al cargar menú:", err);
    }
  };

  useEffect(() => {
    loadAllMenus();
  }, []);

  const handleCategorySelect = async (id: number | null) => {
    if (id === null) {
      loadAllMenus();
    } else {
      try {
        const res = await axiosInstance.get(`/category/${id}`);
        setMenus(res.data.menus);
      } catch (err) {
        console.error("Error al filtrar categoría:", err);
      }
    }
  };

  return (
    <div className="menus-page">
      <ChipButtonsCategories onSelect={handleCategorySelect} />

      <h1>Menú</h1>
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
      <div className="menus-list">
        {menus.map((item) => (
          <div key={item.id} className="menu-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>S/ {item.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
