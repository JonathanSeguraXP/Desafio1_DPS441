"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import ItemCarrito from "../components/itemcarrito";
import ModalConfirmacion from "../components/ModalConfirmacion";

export default function Carrito() {
  const router = useRouter();
  const { usuario, carrito, totalProductos, totalPrecio, vaciarCarrito } = useCarrito();

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p style={styles.cargando}>Redirigiendo al login...</p>;
  }

  const handleVaciar = () => {
    if (window.confirm("¿Estás seguro de vaciar todo el carrito?")) {
      vaciarCarrito();
    }
  };

  const handleComprar = () => {
    router.push("/factura");
  };

  if (carrito.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Tu Carrito</h2>
        <div style={styles.vacio}>
          <p>No hay productos en el carrito</p>
          <button 
            onClick={() => router.push("/productos")}
            style={styles.btnIr}
          >
            Ir a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Tu Carrito ({totalProductos} productos)</h2>
      
      <div style={styles.itemsContainer}>
        {carrito.map(item => (
          <ItemCarrito key={item.id} item={item} />
        ))}
      </div>
      
      <div style={styles.resumen}>
        <div style={styles.total}>
          <h3>Total a pagar:</h3>
          <h2 style={styles.totalPrecio}>${totalPrecio.toFixed(2)}</h2>
        </div>
        
        <div style={styles.acciones}>
          <button 
            onClick={handleVaciar}
            style={styles.btnVaciar}
          >
            Vaciar Carrito
          </button>
          <button 
            onClick={handleComprar}
            style={styles.btnComprar}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "20px"
  },
  titulo: {
    marginBottom: "30px",
    color: "#333"
  },
  itemsContainer: {
    marginBottom: "30px"
  },
  resumen: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd"
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  totalPrecio: {
    color: "#2c3e50",
    fontSize: "1.8rem"
  },
  acciones: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end"
  },
  btnVaciar: {
    padding: "12px 25px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  btnComprar: {
    padding: "12px 25px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  vacio: {
    textAlign: "center",
    padding: "50px",
    background: "#f9f9f9",
    borderRadius: "8px"
  },
  btnIr: {
    padding: "10px 20px",
    background: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px"
  },
  cargando: {
    textAlign: "center",
    marginTop: "50px",
    color: "#666"
  }
};