"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "../context/CarritoContext";
import usuarios from "../datos/usuarios.json";
import styles from "./Login.module.css";

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
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icono}>🛒</div>
        <h2 className={styles.title}>
          Tecno<span>Store</span>
        </h2>
        
        {error && <p className={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>USUARIO</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>CONTRASEÑA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </div>
  );
}