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
  activeId?: number | null;
}

export function ChipButtonsCategories({ onSelect, activeId }: ChipButtonsCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);

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
    onSelect(id);
  };

  const newArray = categories.map((cat) => cat.name);

  return (
    <div className="chip-buttons">
      <pre>{JSON.stringify(newArray, null, 2)}</pre>
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
