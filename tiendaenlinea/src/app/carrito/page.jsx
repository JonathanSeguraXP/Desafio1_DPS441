"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import ItemCarrito from "../components/itemcarrito";
import ModalConfirmacion from "../components/ModalConfirmacion";
import styles from "./Carrito.module.css";

export default function Carrito() {
  const router = useRouter();
  const { usuario, carrito, totalProductos, totalPrecio, vaciarCarrito } = useCarrito();
  const [modalVaciar, setModalVaciar] = useState(false);
  const [comprando, setComprando] = useState(false);

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p className={styles.cargando}>Redirigiendo al login...</p>;
  }

  const handleVaciar = () => {
    setModalVaciar(true);
  };

  const handleComprar = () => {
    setComprando(true);
    router.push("/factura");
  };

  if (carrito.length === 0) {
    return (
      <div className={styles.container}>
        <h2>Tu Carrito</h2>
        <div className={styles.vacio}>
          <p>No hay productos en el carrito</p>
          <button 
            onClick={() => router.push("/productos")}
            className={styles.btnIr}
          >
            Ir a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Tu Carrito ({totalProductos} productos)</h2>
      
      <div className={styles.itemsContainer}>
        {carrito.map(item => (
          <ItemCarrito key={item.id} item={item} />
        ))}
      </div>
      
      <div className={styles.resumen}>
        <div className={styles.total}>
          <h3>Total a pagar:</h3>
          <h2 className={styles.totalPrecio}>${totalPrecio.toFixed(2)}</h2>
        </div>
        
        <div className={styles.acciones}>
          <button 
            onClick={handleVaciar}
            className={styles.btnVaciar}
          >
            Vaciar Carrito
          </button>
          <button 
            onClick={handleComprar}
            className={styles.btnComprar}
            disabled={comprando}
          >
            {comprando ? "Procesando..." : "Proceder al Pago"}
          </button>
        </div>
      </div>

      <ModalConfirmacion 
        visible={modalVaciar}
        cerrarModal={() => setModalVaciar(false)}
        confirmar={() => {
          vaciarCarrito();
          setModalVaciar(false);
        }}
        titulo="Vaciar carrito"
        mensaje="¿Seguro que quieres eliminar todos los productos?"
      />
    </div>
  );
}