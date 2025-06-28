"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./BottomTabs.scss";

export function BottomTabs() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bottom-tabs">
      <Link href="/menu" className={`tab ${isActive("/menu") ? "active" : ""}`}>
        <i className="fa-solid fa-utensils"></i>
        <span>Menú</span>
      </Link>
      <Link href="/cuenta" className={`tab ${isActive("/cuenta") ? "active" : ""}`}>
        <i className="fa-solid fa-user"></i>
        <span>Mi cuenta</span>
      </Link>
      <Link href="/orden" className={`tab ${isActive("/orden") ? "active" : ""}`}>
        <i className="fa-solid fa-receipt"></i>
        <span>Mi orden</span>
      </Link>
      {/* <Link href="/meseros" className={`tab ${isActive("/meseros") ? "active" : ""}`}>
        <i className="fa-solid fa-user-tie"></i>
        <span>Meseros</span>
      </Link> */}
      <Link href="/sedes" className={`tab ${isActive("/sedes") ? "active" : ""}`}>
        <i className="fa-solid fa-map-marker-alt"></i>
        <span>Sedes</span>
      </Link>
      <Link href="/delivery" className={`tab ${isActive("/delivery") ? "active" : ""}`}>
        <i className="fa-brands fa-whatsapp"></i>
        <span>Delivery</span>
      </Link>
    </nav>
  );
}
