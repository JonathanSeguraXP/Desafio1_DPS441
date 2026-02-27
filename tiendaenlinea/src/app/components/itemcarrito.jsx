"use client";
import Image from "next/image";
import { useCarrito } from "../context/CarritoContext";

export default function ItemCarrito({ item }) {
  const { actualizarCantidad, eliminarDelCarrito } = useCarrito();

  const handleEliminar = () => {
    if (window.confirm(`¿Estás seguro de eliminar ${item.nombre} del carrito?`)) {
      eliminarDelCarrito(item.id);
    }
  };

  return (
    <div style={styles.item}>
      <div style={styles.imageContainer}>
        <Image
          src={item.imagen}
          alt={item.nombre}
          width={80}
          height={80}
          style={styles.image}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80";
          }}
        />
      </div>
      
      <div style={styles.info}>
        <h4 style={styles.nombre}>{item.nombre}</h4>
        <p style={styles.precio}>${item.precio.toFixed(2)} c/u</p>
        
        <div style={styles.controles}>
          <button 
            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
            style={styles.btnCantidad}
          >
            -
          </button>
          
          <span style={styles.cantidad}>{item.cantidad}</span>
          
          <button 
            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
            style={styles.btnCantidad}
          >
            +
          </button>
          
          <button 
            onClick={handleEliminar}
            style={styles.btnEliminar}
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div style={styles.subtotal}>
        <p>Subtotal:</p>
        <p style={styles.subtotalValor}>
          ${(item.precio * item.cantidad).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "white"
  },
  imageContainer: {
    width: "80px",
    height: "80px",
    flexShrink: 0
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  info: {
    flex: 1
  },
  nombre: {
    margin: "0 0 5px 0",
    color: "#333"
  },
  precio: {
    margin: "0 0 10px 0",
    color: "#666",
    fontSize: "0.9rem"
  },
  controles: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  btnCantidad: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    cursor: "pointer",
    fontSize: "1rem"
  },
  cantidad: {
    minWidth: "30px",
    textAlign: "center"
  },
  btnEliminar: {
    padding: "5px 10px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginLeft: "10px"
  },
  subtotal: {
    textAlign: "right",
    minWidth: "100px"
  },
  subtotalValor: {
    fontWeight: "bold",
    color: "#2c3e50",
    fontSize: "1.1rem"
  }
};