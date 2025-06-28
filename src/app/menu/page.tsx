"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import "./menus.scss";
import { ChipButtonsCategories } from "@/components/ChipButtonsCategories/ChipButtonsCategories";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function MenusPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const loadAllMenus = async () => {
    try {
      const res = await api.get<MenuItem[]>("/menu");
      setMenus(res.data);
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
        const res = await api.get(`/category/${id}`);
        setMenus(res.data.menus); // los menus vienen con la categoría
      } catch (err) {
        console.error("Error al filtrar categoría:", err);
      }
    }
  };

  return (
    <div className="menus-page">
      <ChipButtonsCategories onSelect={handleCategorySelect} />

      <h1>Menú</h1>
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
