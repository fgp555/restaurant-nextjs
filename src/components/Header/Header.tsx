// src/components/Header.tsx
import Link from "next/link";
import "./Header.scss";

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="logo">
          <Link href="/">Restaurante Sangileña Campestre</Link>
        </h1>
      </div>
    </header>
  );
}
