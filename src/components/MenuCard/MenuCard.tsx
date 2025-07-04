// components/CardMenu.tsx
import "./../styles/CardMenu.scss";

type Menu = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export default function CardMenu({
  menu,
  onClick,
}: {
  menu: Menu;
  onClick: () => void;
}) {
  return (
    <div className="card-menu" onClick={onClick}>
      <img src={menu.image} alt={menu.name} className="card-image" />
      <div className="card-content">
        <h3>{menu.name}</h3>
        <p>
          <i className="fa-solid fa-dollar-sign" /> {menu.price}
        </p>
      </div>
    </div>
  );
}
