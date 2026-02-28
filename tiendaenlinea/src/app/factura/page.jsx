"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import Image from "next/image";
import html2pdf from "html2pdf.js";
import styles from "./Factura.module.css";

export default function Factura() {
  const router = useRouter();
  const { usuario, carrito, totalPrecio, vaciarCarrito } = useCarrito();
  const [facturaGenerada, setFacturaGenerada] = useState(false);
  const [cargando, setCargando] = useState(false);
  const facturaRef = useRef(null);

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p className={styles.cargando}>Cargando...</p>;
  }

  if (!facturaGenerada && carrito.length > 0) {
    setFacturaGenerada(true);
  }

  const fecha = new Date().toLocaleDateString("es-SV", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const numeroFactura = "FAC-" + Date.now().toString().slice(-8);
  const iva = totalPrecio * 0.13;
  const totalConIva = totalPrecio + iva;

  const descargarPDF = () => {
    setCargando(true);
    
    const opciones = {
      margin:        [0.5, 0.5, 0.5, 0.5],
      filename:     `factura-${numeroFactura}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(facturaRef.current).save();
    
    setTimeout(() => {
      setCargando(false);
    }, 1000);
  };

  const finalizarCompra = () => {
    vaciarCarrito();
    router.push("/productos");
  };

  if (carrito.length === 0 && !facturaGenerada) {
    return (
      <div className={styles.container}>
        <div className={styles.vacio}>
          <h2>No hay productos para facturar</h2>
          <button onClick={() => router.push("/productos")} className={styles.btn}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div ref={facturaRef} className={styles.factura}>
        <div className={styles.header}>
          <h1 className={styles.titulo}>🛒 TECHSTORE EL SALVADOR</h1>
          <p className={styles.subtitulo}>Factura de Compra</p>
          <p className={styles.nit}>NIT: 0614-290598-123-4</p>
          <p className={styles.regimen}>Responsable: Régimen General</p>
        </div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoLeft}>
            <p><strong>Factura N°:</strong> {numeroFactura}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Vendedor:</strong> Juan Pérez</p>
            <p><strong>Documento:</strong> 12345678-9</p>
          </div>
          <div className={styles.infoRight}>
            <p><strong>Cliente:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> 7654-3210</p>
            <p><strong>Dirección:</strong> San Salvador</p>
          </div>
        </div>
        
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th className={styles.th}>Producto</th>
              <th className={styles.th}>Cant.</th>
              <th className={styles.th}>P.Unit</th>
              <th className={styles.th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td className={styles.td}>
                  <div className={styles.productoInfo}>
                    <Image 
                      src={item.imagen}
                      alt={item.nombre}
                      width={25}
                      height={25}
                      className={styles.imagenFactura}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/25";
                      }}
                    />
                    <span className={styles.nombreProducto}>{item.nombre}</span>
                  </div>
                </td>
                <td className={styles.tdCenter}>{item.cantidad}</td>
                <td className={styles.tdRight}>${item.precio.toFixed(2)}</td>
                <td className={styles.tdRight}>${(item.precio * item.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className={styles.totales}>
          <div className={styles.lineaTotal}>
            <span>Subtotal:</span>
            <span>${totalPrecio.toFixed(2)}</span>
          </div>
          <div className={styles.lineaTotal}>
            <span>IVA (13%):</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          <div className={styles.lineaTotal}>
            <span>Descuento:</span>
            <span>$0.00</span>
          </div>
          <div className={styles.lineaTotalFinal}>
            <span>TOTAL A PAGAR:</span>
            <span>${totalConIva.toFixed(2)}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <p>¡Gracias por tu compra!</p>
          <p className={styles.footerSmall}>Artículos tecnológicos de calidad en El Salvador</p>
          <p className={styles.footerSmall}>Tel: 2288-5678 | San Salvador</p>
          <p className={styles.footerSmall}>www.techstore.com.sv</p>
        </div>
      </div>
      
      <div className={styles.acciones}>
        <button 
          onClick={descargarPDF} 
          className={styles.btnPDF}
          disabled={cargando}
        >
          {cargando ? "Generando PDF..." : "📥 Descargar PDF"}
        </button>
        <button 
          onClick={finalizarCompra} 
          className={styles.btnVolver}
        >
          ← Finalizar compra
        </button>
      </div>
    </div>
  );
}