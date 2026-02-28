"use client";
import Image from "next/image";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import ModalConfirmacion from "./ModalConfirmacion";
import styles from "./ItemCarrito.module.css";

export default function ItemCarrito({ item }) {
  const { actualizarCantidad, eliminarDelCarrito, productos } = useCarrito();
  const [modalVisible, setModalVisible] = useState(false);
  
  // Obtener stock actualizado del producto
  const productoActualizado = productos.find(p => p.id === item.id);
  const stockDisponibleGlobal = productoActualizado ? productoActualizado.stock : 0;
  
  // Stock total (lo que había originalmente + lo que tienes en carrito)
  const stockTotal = item.stock ? item.stock : (stockDisponibleGlobal + item.cantidad);
  const stockEnCarrito = item.cantidad;
  const stockDisponible = stockDisponibleGlobal;

  const abrirModal = () => {
    setModalVisible(true);
  };

  const confirmarEliminar = () => {
    eliminarDelCarrito(item.id);
    setModalVisible(false);
  };

  const aumentarCantidad = () => {
    if (stockDisponible > 0) {
      actualizarCantidad(item.id, item.cantidad + 1);
    } else {
      alert(`❌ No hay más stock disponible de ${item.nombre}`);
    }
  };

  const disminuirCantidad = () => {
    if (item.cantidad > 1) {
      actualizarCantidad(item.id, item.cantidad - 1);
    } else {
      abrirModal();
    }
  };

  return (
    <>
      <div className={styles.item}>
        <div className={styles.imageContainer}>
          <Image
            src={item.imagen}
            alt={item.nombre}
            width={80}
            height={80}
            className={styles.image}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80";
            }}
          />
        </div>
        
        <div className={styles.info}>
          <h4 className={styles.nombre}>{item.nombre}</h4>
          <p className={styles.precio}>${item.precio.toFixed(2)} c/u</p>
          
          {/* Información de stock EN TIEMPO REAL */}
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Stock total:</span>
              <span className={styles.statValue}>{stockTotal}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>En tu carrito:</span>
              <span className={styles.statValue}>{stockEnCarrito}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Disponible:</span>
              <span className={`${styles.statValue} ${stockDisponible > 0 ? styles.disponible : styles.agotado}`}>
                {stockDisponible}
              </span>
            </div>
          </div>
          
          <div className={styles.controles}>
            <button 
              onClick={disminuirCantidad}
              className={styles.btnCantidad}
              title={item.cantidad === 1 ? "Eliminar producto" : "Disminuir cantidad"}
            >
              {item.cantidad === 1 ? "🗑️" : "-"}
            </button>
            
            <span className={styles.cantidad}>{item.cantidad}</span>
            
            <button 
              onClick={aumentarCantidad}
              className={`${styles.btnCantidad} ${stockDisponible === 0 ? styles.btnDeshabilitado : ''}`}
              disabled={stockDisponible === 0}
              title={stockDisponible === 0 ? "No hay más stock" : "Aumentar cantidad"}
            >
              +
            </button>
            
            <button 
              onClick={abrirModal}
              className={styles.btnEliminar}
              title="Eliminar producto"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <div className={styles.subtotal}>
          <p className={styles.subtotalLabel}>Subtotal:</p>
          <p className={styles.subtotalValor}>
            ${(item.precio * item.cantidad).toFixed(2)}
          </p>
        </div>
      </div>

      <ModalConfirmacion 
        visible={modalVisible}
        cerrarModal={() => setModalVisible(false)}
        confirmar={confirmarEliminar}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que quieres eliminar "${item.nombre}" del carrito?`}
      />
    </>
  );
}