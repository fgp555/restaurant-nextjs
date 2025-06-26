// src/components/Footer.tsx
import "./Footer.scss";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Sabor & Arte. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
