// components/CardMenu.tsx
import "./../styles/CardMenu.scss";

type Menu = {
  id: number;
  name: string;
  image?: string | null;
  price: number;
};

export default function CardMenu({
  menu,
  onClick,
}: {
  menu: Menu;
  onClick: () => void;
}) {
  const imageSrc =
    menu.image && menu.image !== "null"
      ? menu.image
      : "https://images-mini.cluvi.com/fOV3vuIoU0/w_1200_fOV3vuIoU0_la-llanera-sangilena-43.png";

  return (
    <div className="card-menu" onClick={onClick}>
      <img src={imageSrc} alt={menu.name} className="card-image" />
      <div className="card-content">
        <h3>{menu.name}</h3>
        <p>
          <i className="fa-solid fa-dollar-sign" /> {menu.price}
        </p>
      </div>
    </div>
  );
}
