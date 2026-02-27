"use client";
import Link from "next/link";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
  const { usuario, totalProductos, logout } = useCarrito();

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link href="/" style={styles.link}>
          <h1>🛒 TechStore</h1>
        </Link>
      </div>
      
      <nav style={styles.nav}>
        <Link href="/productos" style={styles.link}>Productos</Link>
        <Link href="/carrito" style={styles.link}>
          Carrito 🛒 ({totalProductos})
        </Link>
        {usuario ? (
          <>
            <span style={styles.usuario}>Hola, {usuario.nombre}</span>
            <button onClick={logout} style={styles.boton}>Salir</button>
          </>
        ) : (
          <Link href="/login" style={styles.link}>Login</Link>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#2c3e50",
    color: "white"
  },
  logo: {
    fontSize: "1.2rem"
  },
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem"
  },
  usuario: {
    color: "#f1c40f",
    marginRight: "10px"
  },
  boton: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};