"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import TarjetaProducto from "../components/tarjetaproducto";
import productos from "../datos/productos.json";

export default function Productos() {
  const { usuario } = useCarrito();
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p style={styles.cargando}>Redirigiendo al login...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Nuestros Productos</h2>
      <div style={styles.grid}>
        {productos.map(producto => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto"
  },
  titulo: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  },
  cargando: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#666"
  }
};