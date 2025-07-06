// src/pages/HomePage/HomePage.tsx
import "./HomePage.scss";

export default function HomePage() {
  return (
    <div className="home-page">
      <h1 className="title">Bienvenidos a Restaurante Sabor & Arte</h1>
      {/* <img src="/hero.jpg" alt="Plato delicioso" className="hero-image" /> */}
      <p className="description">
        Disfruta de una experiencia culinaria única con sabores tradicionales y toques modernos. ¡Te esperamos!
      </p>
      <button className="cta-button">Ver Menú</button>
      
    </div>
  );
}
