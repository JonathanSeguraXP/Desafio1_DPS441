"use client";
import Image from "next/image";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import ModalConfirmacion from "../components/ModalConfirmacion";

export default function ItemCarrito({ item }) {
  const { actualizarCantidad, eliminarDelCarrito } = useCarrito();
  const [showModal, setShowModal] = useState(false);

  const handleEliminarClick = () => {
    setShowModal(true);
  };

  const handleConfirmarEliminar = () => {
    eliminarDelCarrito(item.id);
    setShowModal(false);
  };

  return (
    <>
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
              onClick={handleEliminarClick}
              style={styles.btnEliminar}
              title="Eliminar producto"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <div style={styles.subtotal}>
          <p style={styles.subtotalLabel}>Subtotal:</p>
          <p style={styles.subtotalValor}>
            ${(item.precio * item.cantidad).toFixed(2)}
          </p>
        </div>
      </div>

      <ModalConfirmacion 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmarEliminar}
        titulo="Eliminar producto"
        mensaje={`¿Estás seguro que deseas eliminar "${item.nombre}" del carrito?`}
      />
    </>
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
    background: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
  },
  imageContainer: {
    width: "80px",
    height: "80px",
    flexShrink: 0,
    borderRadius: "4px",
    overflow: "hidden",
    background: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    color: "#333",
    fontSize: "1rem"
  },
  precio: {
    margin: "0 0 10px 0",
    color: "#666",
    fontSize: "0.9rem"
  },
  controles: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  btnCantidad: {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.2s",
    ":hover": {
      background: "#e0e0e0"
    }
  },
  cantidad: {
    minWidth: "30px",
    textAlign: "center",
    fontSize: "1rem"
  },
  btnEliminar: {
    padding: "5px 10px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginLeft: "10px",
    transition: "transform 0.2s",
    ":hover": {
      transform: "scale(1.1)"
    }
  },
  subtotal: {
    textAlign: "right",
    minWidth: "100px"
  },
  subtotalLabel: {
    margin: "0 0 5px 0",
    color: "#666",
    fontSize: "0.9rem"
  },
  subtotalValor: {
    margin: "0",
    fontWeight: "bold",
    color: "#2c3e50",
    fontSize: "1.1rem"
  }
};