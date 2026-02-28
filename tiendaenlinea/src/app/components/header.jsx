"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Importar para detectar la ruta actual
import { useCarrito } from "../context/CarritoContext";
import styles from "./Header.module.css";

export default function Header() {
  const { usuario, totalProductos, logout } = useCarrito();
  const pathname = usePathname(); // Obtener la ruta actual
  
  // Si estamos en la página de login, NO mostrar el header
  if (pathname === "/login") {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" className={styles.link}>
          <h1>🛒 TechStore</h1>
        </Link>
      </div>
      
      <nav className={styles.nav}>
        <Link href="/productos" className={styles.link}>Productos</Link>
        <Link href="/carrito" className={styles.link}>
          Carrito 🛒 ({totalProductos})
        </Link>
        {usuario ? (
          <>
            <span className={styles.usuario}>Hola, {usuario.nombre}</span>
            <button onClick={logout} className={styles.boton}>Salir</button>
          </>
        ) : (
          <Link href="/login" className={styles.link}>Login</Link>
        )}
      </nav>
    </header>
  );
}