"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import usuarios from "../datos/usuarios.json";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useCarrito();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === username && u.password === password
    );

    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      router.push("/productos");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        
        {error && <p style={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
        
        <p style={styles.demo}>
          Usuario: admin / Contraseña: 123456
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px"
  },
  button: {
    background: "#2c3e50",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px"
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px"
  },
  demo: {
    textAlign: "center",
    marginTop: "20px",
    color: "#666",
    fontSize: "14px"
  }
};