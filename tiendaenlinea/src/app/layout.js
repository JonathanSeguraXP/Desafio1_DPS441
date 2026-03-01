"use client";
import { usePathname } from "next/navigation";
import { CarritoProvider } from "./context/CarritoContext";
import Header from "./components/header";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="es">
      <body>
        <CarritoProvider>
          <Header />
          <main style={{ 
            minHeight: "80vh", 
            padding: "20px",
            display: "flex",
            alignItems: isLoginPage ? "center" : "flex-start",
            justifyContent: isLoginPage ? "center" : "flex-start"
          }}>
            {children}
          </main>
          {!isLoginPage && (
            <footer style={{ 
              textAlign: "center", 
              padding: "20px", 
              background: "#f0f0f0" 
            }}>
              <p>Tienda de Tecnología - Todos los derechos reservados</p>
            </footer>
          )}
        </CarritoProvider>
      </body>
    </html>
  );
}