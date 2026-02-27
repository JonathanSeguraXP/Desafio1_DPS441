"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import Image from "next/image";

export default function Factura() {
  const router = useRouter();
  const { usuario, carrito, totalPrecio, vaciarCarrito } = useCarrito();
  const [facturaGenerada, setFacturaGenerada] = useState(false);

  useEffect(() => {
    if (!usuario) {
      router.push("/login");
    }
  }, [usuario, router]);

  if (!usuario) {
    return <p style={styles.cargando}>Redirigiendo al login...</p>;
  }

  const handleFinalizar = () => {
    vaciarCarrito();
    router.push("/productos");
  };

  if (!facturaGenerada && carrito.length > 0) {
    setFacturaGenerada(true);
  }

  const fecha = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const numeroFactura = "FAC-" + Date.now().toString().slice(-8);

  if (carrito.length === 0 && !facturaGenerada) {
    return (
      <div style={styles.container}>
        <h2>No hay productos para facturar</h2>
        <button onClick={() => router.push("/productos")} style={styles.btn}>
          Ir a Productos
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.factura}>
        <div style={styles.header}>
          <h1 style={styles.titulo}>TECHSTORE</h1>
          <p style={styles.subtitulo}>Factura de Compra</p>
        </div>
        
        <div style={styles.info}>
          <div style={styles.infoLeft}>
            <p><strong>Factura N°:</strong> {numeroFactura}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
          </div>
          <div style={styles.infoRight}>
            <p><strong>Cliente:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
          </div>
        </div>
        
        <table style={styles.tabla}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td style={styles.productoCell}>
                  <div style={styles.productoInfo}>
                    <Image 
                      src={item.imagen}
                      alt={item.nombre}
                      width={40}
                      height={40}
                      style={styles.imagenFactura}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                    <span>{item.nombre}</span>
                  </div>
                </td>
                <td style={styles.center}>{item.cantidad}</td>
                <td style={styles.right}>${item.precio.toFixed(2)}</td>
                <td style={styles.right}>${(item.precio * item.cantidad).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={styles.totalLabel}>TOTAL:</td>
              <td style={styles.totalValor}>${totalPrecio.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <div style={styles.footer}>
          <p>¡Gracias por tu compra!</p>
          <button onClick={handleFinalizar} style={styles.btnFinalizar}>
            Finalizar
          </button>
        </div>
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
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
    paddingBottom: "20px",
    borderBottom: "2px solid #2c3e50"
  },
  titulo: {
    margin: 0,
    color: "#2c3e50",
    fontSize: "2rem"
  },
  subtitulo: {
    margin: "5px 0 0",
    color: "#666"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    padding: "15px",
    background: "#f5f5f5",
    borderRadius: "4px"
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
  productoCell: {
    padding: "10px"
  },
  productoInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  imagenFactura: {
    width: "40px",
    height: "40px",
    objectFit: "contain"
  },
  center: {
    textAlign: "center",
    padding: "10px"
  },
  right: {
    textAlign: "right",
    padding: "10px"
  },
  totalLabel: {
    textAlign: "right",
    padding: "15px 10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
    borderTop: "2px solid #2c3e50"
  },
  totalValor: {
    textAlign: "right",
    padding: "15px 10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
    borderTop: "2px solid #2c3e50",
    color: "#27ae60"
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #ddd"
  },
  btnFinalizar: {
    padding: "12px 30px",
    background: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "15px"
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
  cargando: {
    textAlign: "center",
    marginTop: "50px",
    color: "#666"
  }
};