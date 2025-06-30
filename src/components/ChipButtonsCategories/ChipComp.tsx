"use client";

import { useEffect, useRef, useState } from "react";
import "./ChipComp.scss";

const categories = [
  "Coding",
  "JavaScript",
  "Podcasts",
  "Databases",
  "Web Development",
  "Unboxing",
  "History",
  "Programming",
  "Gadgets",
  "Algorithms",
  "Comedy",
  "Gaming",
  "Share Market",
  "Smartphones",
  "Data Structure",
];

const ChipComp = () => {
  const tabsBoxRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(1); // "JavaScript" como activo por defecto

  useEffect(() => {
    const tabsBox = tabsBoxRef.current;
    if (!tabsBox) return;

    const arrowIcons = document.querySelectorAll(".icon i");

    const handleIcons = (scrollVal: number) => {
      const maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
      (arrowIcons[0].parentElement as HTMLElement).style.display = scrollVal <= 0 ? "none" : "flex";
      (arrowIcons[1].parentElement as HTMLElement).style.display =
        maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
    };

    arrowIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const scrollBy = icon.id === "left" ? -340 : 340;
        tabsBox.scrollLeft += scrollBy;
        handleIcons(tabsBox.scrollLeft);
      });
    });

    let isDragging = false;

    const dragging = (e: MouseEvent) => {
      if (!isDragging) return;
      tabsBox.classList.add("dragging");
      tabsBox.scrollLeft -= e.movementX;
      handleIcons(tabsBox.scrollLeft);
    };

    const dragStop = () => {
      isDragging = false;
      tabsBox.classList.remove("dragging");
    };

    tabsBox.addEventListener("mousedown", () => (isDragging = true));
    tabsBox.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    handleIcons(tabsBox.scrollLeft); // inicializar estado de íconos

    return () => {
      document.removeEventListener("mouseup", dragStop);
    };
  }, []);

  return (
    <div className="chip-comp">
      <div className="wrapper">
        <div className="icon">
          <i id="left" className="fa-solid fa-angle-left"></i>
        </div>
        <ul className="tabs-box" ref={tabsBoxRef}>
          {categories.map((name, index) => (
            <li
              key={index}
              className={`tab ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="icon">
          <i id="right" className="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </div>
  );
};

export default ChipComp;
