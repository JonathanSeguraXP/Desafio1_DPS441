"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import Image from "next/image";
import html2pdf from "html2pdf.js";

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
    return <p style={styles.cargando}>Cargando...</p>;
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
    
    // Opciones para el PDF
    const opciones = {
      margin:        [0.5, 0.5, 0.5, 0.5],
      filename:     `factura-${numeroFactura}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, letterRendering: true },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generar y descargar el PDF
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
      <div style={styles.container}>
        <div style={styles.vacio}>
          <h2>No hay productos para facturar</h2>
          <button onClick={() => router.push("/productos")} style={styles.btn}>
            Ver productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Factura (lo que se va a convertir en PDF) */}
      <div ref={facturaRef} style={styles.factura}>
        {/* Encabezado */}
        <div style={styles.header}>
          <h1 style={styles.titulo}>🛒 TECHSTORE EL SALVADOR</h1>
          <p style={styles.subtitulo}>Factura de Compra</p>
          <p style={styles.nit}>NIT: 0614-290598-123-4</p>
          <p style={styles.regimen}>Responsable: Régimen General</p>
        </div>
        
        {/* Información de factura */}
        <div style={styles.infoGrid}>
          <div style={styles.infoLeft}>
            <p><strong>Factura N°:</strong> {numeroFactura}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Vendedor:</strong> Juan Pérez</p>
            <p><strong>Documento:</strong> 12345678-9</p>
          </div>
          <div style={styles.infoRight}>
            <p><strong>Cliente:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Teléfono:</strong> 7654-3210</p>
            <p><strong>Dirección:</strong> San Salvador</p>
          </div>
        </div>
        
        {/* Tabla de productos */}
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th style={styles.th}>Producto</th>
              <th style={styles.th}>Cant.</th>
              <th style={styles.th}>P.Unit</th>
              <th style={styles.th}>Total</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td style={styles.td}>
                  <div style={styles.productoInfo}>
                    <Image 
                      src={item.imagen}
                      alt={item.nombre}
                      width={25}
                      height={25}
                      style={styles.imagenFactura}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/25";
                      }}
                    />
                    <span style={styles.nombreProducto}>{item.nombre}</span>
                  </div>
                </td>
                <td style={styles.tdCenter}>{item.cantidad}</td>
                <td style={styles.tdRight}>${item.precio.toFixed(2)}</td>
                <td style={styles.tdRight}>${(item.precio * item.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Totales */}
        <div style={styles.totales}>
          <div style={styles.lineaTotal}>
            <span>Subtotal:</span>
            <span>${totalPrecio.toFixed(2)}</span>
          </div>
          <div style={styles.lineaTotal}>
            <span>IVA (13%):</span>
            <span>${iva.toFixed(2)}</span>
          </div>
          <div style={styles.lineaTotal}>
            <span>Descuento:</span>
            <span>$0.00</span>
          </div>
          <div style={styles.lineaTotalFinal}>
            <span>TOTAL A PAGAR:</span>
            <span>${totalConIva.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Mensaje de gracias */}
        <div style={styles.footer}>
          <p>¡Gracias por tu compra!</p>
          <p style={styles.footerSmall}>Artículos tecnológicos de calidad en El Salvador</p>
          <p style={styles.footerSmall}>Tel: 2288-5678 | San Salvador</p>
          <p style={styles.footerSmall}>www.techstore.com.sv</p>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div style={styles.acciones}>
        <button 
          onClick={descargarPDF} 
          style={styles.btnPDF}
          disabled={cargando}
        >
          {cargando ? "Generando PDF..." : "📥 Descargar PDF"}
        </button>
        <button 
          onClick={finalizarCompra} 
          style={styles.btnVolver}
        >
          ← Finalizar compra
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px"
  },
  factura: {
    background: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #d32f2f"
  },
  titulo: {
    margin: 0,
    color: "#d32f2f",
    fontSize: "24px"
  },
  subtitulo: {
    margin: "5px 0",
    color: "#666",
    fontSize: "18px"
  },
  nit: {
    margin: "5px 0",
    color: "#888",
    fontSize: "14px"
  },
  regimen: {
    margin: "5px 0",
    color: "#888",
    fontSize: "12px"
  },
  infoGrid: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    padding: "15px",
    background: "#f5f5f5",
    borderRadius: "5px"
  },
  infoLeft: {
    textAlign: "left"
  },
  infoRight: {
    textAlign: "right"
  },
  tabla: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px"
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#d32f2f",
    color: "white",
    fontSize: "14px"
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  },
  tdCenter: {
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd"
  },
  tdRight: {
    padding: "10px",
    textAlign: "right",
    borderBottom: "1px solid #ddd"
  },
  productoInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  imagenFactura: {
    width: "25px",
    height: "25px",
    objectFit: "contain"
  },
  nombreProducto: {
    fontSize: "14px"
  },
  totales: {
    width: "300px",
    marginLeft: "auto",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "5px"
  },
  lineaTotal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0",
    fontSize: "14px"
  },
  lineaTotalFinal: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    marginTop: "5px",
    borderTop: "2px solid #d32f2f",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#d32f2f"
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
    color: "#666"
  },
  footerSmall: {
    fontSize: "12px",
    margin: "2px 0"
  },
  acciones: {
    display: "flex",
    gap: "15px",
    justifyContent: "center"
  },
  btnPDF: {
    padding: "12px 30px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    disabled: {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  },
  btnVolver: {
    padding: "12px 30px",
    background: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  },
  btn: {
    padding: "10px 20px",
    background: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px"
  },
  vacio: {
    textAlign: "center",
    padding: "50px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  cargando: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
    color: "#666"
  }
};