import { useEffect, useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    axiosInstance
      .get<Category[]>("/restaurant/categories/la-espanolita")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleClick = (id: number | null) => {
    onSelect(id);
  };

  // 🟡 Scroll horizontal automático cuando cambia activeId
  useEffect(() => {
    if (typeof activeId === "number" && chipRefs.current[activeId] && scrollRef.current) {
      const chipEl = chipRefs.current[activeId]!;
      const scrollBox = scrollRef.current;
      const chipCenter = chipEl.offsetLeft + chipEl.offsetWidth / 2;
      const scrollTo = chipCenter - scrollBox.offsetWidth / 2;

      scrollBox.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }, [activeId]);

  return (
    <div ref={scrollRef} className="chip-buttons scrollable">
      {/* <button className={`chip ${activeId === null ? "active" : ""}`} onClick={() => handleClick(null)}>
        Todos
      </button> */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          ref={(el) => {
            chipRefs.current[cat.id] = el;
          }}
          className={`chip ${activeId === cat.id ? "active" : ""}`}
          onClick={() => handleClick(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
