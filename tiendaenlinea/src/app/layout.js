import { CarritoProvider } from "./context/CarritoContext";
import Header from "./components/Header";
import "./globals.css";

export const metadata = {
  title: "Tienda de Tecnología",
  description: "Venta de hardware y software",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CarritoProvider>
          <Header />
          <main style={{ minHeight: "80vh", padding: "20px" }}>
            {children}
          </main>
          <footer style={{ textAlign: "center", padding: "20px", background: "#f0f0f0" }}>
            <p>Tienda de Tecnología - Todos los derechos reservados</p>
          </footer>
        </CarritoProvider>
      </body>
    </html>
  );
}