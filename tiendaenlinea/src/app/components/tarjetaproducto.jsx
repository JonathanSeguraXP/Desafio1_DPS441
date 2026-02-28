"use client";
import Image from "next/image";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import styles from "./tarjetaProducto.module.css";

export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito } = useCarrito();
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const handleAgregar = () => {
    if (producto.stock === 0) {
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

  const getStockClass = () => {
    if (producto.stock === 0) return styles.stockAgotado;
    if (producto.stock <= 3) return styles.stockCritico;
    if (producto.stock <= 10) return styles.stockBajo;
    return styles.stockNormal;
  };

  const getStockText = () => {
    if (producto.stock === 0) return "🚫 Agotado";
    if (producto.stock <= 3) return `⚠️ ¡Últimas ${producto.stock} unidades!`;
    if (producto.stock <= 10) return `📦 Stock: ${producto.stock}`;
    return `✅ Stock: ${producto.stock}`;
  };

  return (
    <div className={`${styles.card} ${producto.stock === 0 ? styles.cardAgotado : ''}`}>
      {producto.stock > 0 && producto.stock <= 3 && (
        <div className={styles.etiquetaOferta}>
          ¡Últimas {producto.stock}!
        </div>
      )}
      
      <div className={styles.imageContainer}>
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          width={200}
          height={200}
          className={styles.image}
          unoptimized={true}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.nombre}>{producto.nombre}</h3>
        <p className={styles.descripcion}>{producto.descripcion}</p>
        
        <div className={styles.stockContainer}>
          <span className={`${styles.stockBadge} ${getStockClass()}`}>
            {getStockText()}
          </span>
        </div>
        
        <p className={styles.precio}>${producto.precio.toFixed(2)}</p>
        
        {producto.stock > 0 ? (
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
                    onClick={() => setCantidadSeleccionada(Math.min(producto.stock, cantidadSeleccionada + 1))}
                    className={styles.selectorBtn}
                    disabled={cantidadSeleccionada >= producto.stock}
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
                  Disponible: {producto.stock} unidades
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