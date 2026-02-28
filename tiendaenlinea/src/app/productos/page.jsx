"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import TarjetaProducto from "../components/tarjetaproducto";
import styles from "./Productos.module.css";

export default function Productos() {
  const { usuario, productos } = useCarrito();
  const router = useRouter();

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p className={styles.cargando}>Redirigiendo al login...</p>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Nuestros Productos</h2>
      {/* ✅ ELIMINADO: <p className={styles.stockInfo}>📦 Stock actualizado en tiempo real</p> */}
      <div className={styles.grid}>
        {productos.map(producto => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}