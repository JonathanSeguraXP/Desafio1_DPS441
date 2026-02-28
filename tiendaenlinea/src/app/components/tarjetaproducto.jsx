"use client";
import Image from "next/image";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import styles from "./tarjetaProducto.module.css";

export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito, productos } = useCarrito();
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  // Obtener el stock ACTUALIZADO en tiempo real
  const productoActualizado = productos.find(p => p.id === producto.id) || producto;
  const stockActual = productoActualizado.stock;

  const handleAgregar = () => {
    if (stockActual === 0) {
      alert(`❌ ${producto.nombre} está agotado`);
      return;
    }
    
    const exito = agregarAlCarrito(producto, cantidadSeleccionada);
    
    if (exito) {
      alert(`✅ ${cantidadSeleccionada} ${producto.nombre}(s) agregado(s) al carrito`);
      setMostrarSelector(false);
      setCantidadSeleccionada(1);
    }
  };

  // Determinar clase de stock
  const getStockClass = () => {
    if (stockActual === 0) return styles.stockAgotado;
    if (stockActual <= 3) return styles.stockCritico;
    if (stockActual <= 10) return styles.stockBajo;
    return styles.stockNormal;
  };

  // Texto de stock
  const getStockText = () => {
    if (stockActual === 0) return "🚫 Agotado";
    if (stockActual <= 3) return `⚠️ ¡Últimas ${stockActual} unidades!`;
    if (stockActual <= 10) return `📦 Stock: ${stockActual}`;
    return `✅ Stock: ${stockActual}`;
  };

  return (
    <div className={`${styles.card} ${stockActual === 0 ? styles.cardAgotado : ''}`}>
      {/* Etiqueta de oferta si hay poco stock */}
      {stockActual > 0 && stockActual <= 3 && (
        <div className={styles.etiquetaOferta}>
          ¡Últimas {stockActual}!
        </div>
      )}
      
      <div className={styles.imageContainer}>
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={200}
          height={200}
          className={styles.image}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200";
          }}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.nombre}>{producto.nombre}</h3>
        <p className={styles.descripcion}>{producto.descripcion}</p>
        
        {/* Indicador de stock en tiempo real */}
        <div className={styles.stockContainer}>
          <span className={`${styles.stockBadge} ${getStockClass()}`}>
            {getStockText()}
          </span>
        </div>
        
        <p className={styles.precio}>${producto.precio.toFixed(2)}</p>
        
        {stockActual > 0 ? (
          <>
            {!mostrarSelector ? (
              <button 
                onClick={() => setMostrarSelector(true)}
                className={styles.boton}
              >
                🛒 Agregar al carrito
              </button>
            ) : (
              <div className={styles.selectorContainer}>
                <p className={styles.selectorTitulo}>¿Cuántos deseas?</p>
                <div className={styles.selectorCantidad}>
                  <button 
                    onClick={() => setCantidadSeleccionada(Math.max(1, cantidadSeleccionada - 1))}
                    className={styles.selectorBtn}
                    disabled={cantidadSeleccionada <= 1}
                  >
                    -
                  </button>
                  <span className={styles.selectorValor}>{cantidadSeleccionada}</span>
                  <button 
                    onClick={() => setCantidadSeleccionada(Math.min(stockActual, cantidadSeleccionada + 1))}
                    className={styles.selectorBtn}
                    disabled={cantidadSeleccionada >= stockActual}
                  >
                    +
                  </button>
                </div>
                <div className={styles.selectorAcciones}>
                  <button 
                    onClick={handleAgregar}
                    className={styles.selectorConfirmar}
                  >
                    Confirmar
                  </button>
                  <button 
                    onClick={() => {
                      setMostrarSelector(false);
                      setCantidadSeleccionada(1);
                    }}
                    className={styles.selectorCancelar}
                  >
                    Cancelar
                  </button>
                </div>
                <p className={styles.selectorStock}>
                  Disponible: {stockActual} unidades
                </p>
              </div>
            )}
          </>
        ) : (
          <button 
            className={`${styles.boton} ${styles.botonAgotado}`}
            disabled
          >
            🚫 Agotado
          </button>
        )}
      </div>
    </div>
  );
}