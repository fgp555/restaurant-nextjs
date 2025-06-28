// ChipButtonsCategories.tsx

"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import "./ChipButtonsCategories.scss";

interface Category {
  id: number;
  name: string;
}

interface ChipButtonsCategoriesProps {
  onSelect: (categoryId: number | null) => void;
}

export function ChipButtonsCategories({ onSelect }: ChipButtonsCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axiosInstance.get<Category[]>("/restaurant/categories/la-espanolita");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories();
  }, []);

  const handleClick = (id: number | null) => {
    setActiveId(id);
    onSelect(id);
  };

  return (
    <div className="chip-buttons">
      <button className={`chip ${activeId === null ? "active" : ""}`} onClick={() => handleClick(null)}>
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`chip ${activeId === cat.id ? "active" : ""}`}
          onClick={() => handleClick(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
