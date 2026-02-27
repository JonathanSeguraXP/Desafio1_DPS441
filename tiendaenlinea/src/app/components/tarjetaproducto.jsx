"use client";
import Image from "next/image";
import { useCarrito } from "../context/CarritoContext";

export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={200}
          height={200}
          style={styles.image}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200";
          }}
        />
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.nombre}>{producto.nombre}</h3>
        <p style={styles.descripcion}>{producto.descripcion}</p>
        <p style={styles.precio}>${producto.precio.toFixed(2)}</p>
        <button 
          onClick={() => agregarAlCarrito(producto)}
          style={styles.boton}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  imageContainer: {
    height: "200px",
    background: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    objectFit: "contain",
    width: "100%",
    height: "100%"
  },
  content: {
    padding: "15px"
  },
  nombre: {
    margin: "0 0 10px 0",
    fontSize: "1.1rem",
    color: "#333"
  },
  descripcion: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "10px"
  },
  precio: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "15px"
  },
  boton: {
    width: "100%",
    padding: "10px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem"
  }
};