// src/app/landing/layout.tsx
import type { ReactNode } from "react";
import "./landing-layout.scss"; // (opcional) estilos específicos

// src/app/landing/layout.tsx
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Aquí NO se aplica el layout global */}
        <header className="landing-header">Landing Header</header>
        <main>{children}</main>
        <footer className="landing-footer">Landing Footer</footer>
      </body>
    </html>
  );
}
