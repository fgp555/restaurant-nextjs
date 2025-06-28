"use client";

import { useEffect, useRef, useState } from "react";
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const categoryRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Cargar todas las categorías con sus menús
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

  // Scroll hacia categoría al hacer click en chip
  const handleCategorySelect = (id: number | null) => {
    if (id === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveCategoryId(null);
      return;
    }

    const el = categoryRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Detectar scroll para activar el chip correspondiente
  useEffect(() => {
    const handleScroll = () => {
      for (const cat of categories) {
        const el = categoryRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveCategoryId(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  return (
    <div className="menus-page">
      <h1>Menú</h1>

      <ChipButtonsCategories onSelect={handleCategorySelect} activeId={activeCategoryId} />

      {categories.map((cat) => (
        <div
          key={cat.id}
          ref={(el) => {
            categoryRefs.current[cat.id] = el;
          }}
          className="category-block"
        >
          <h2>{cat.name}</h2>
          <div className="menus-list">
            {cat.menus.map((item) => (
              <div key={item.id} className="menu-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <strong>S/ {item.price}</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
