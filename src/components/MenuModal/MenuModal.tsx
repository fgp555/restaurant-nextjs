// components/MenuModal.tsx
import { useEffect, useRef } from "react";
import "./../styles/MenuModal.scss";

type Menu = {
  id: number;
  name: string;
  image?: string | null;
  price: number;
  description: string;
};

export default function MenuModal({
  menu,
  onClose,
  onNext,
  hasNext,
}: {
  menu: Menu;
  onClose: () => void;
  onNext: () => void;
  hasNext: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const imageSrc =
    menu.image && menu.image !== "null"
      ? menu.image
      : "https://images-mini.cluvi.com/fOV3vuIoU0/w_1200_fOV3vuIoU0_la-llanera-sangilena-43.png";

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark" />
        </button>
        <img src={imageSrc} alt={menu.name} />
        <h2>{menu.name}</h2>
        <p className="description">{menu.description}</p>
        <p className="price">
          <i className="fa-solid fa-dollar-sign" /> {menu.price}
        </p>
        {hasNext && (
          <button className="next-button" onClick={onNext}>
            <i className="fa-solid fa-chevron-down" /> Siguiente menú
          </button>
        )}
      </div>
    </div>
  );
}
