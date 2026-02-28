"use client";
import styles from "./ModalConfirmacion.module.css";

export default function ModalConfirmacion({ 
  visible, 
  cerrarModal, 
  confirmar, 
  titulo, 
  mensaje 
}) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icono}>❓</div>
        <h3 className={styles.titulo}>{titulo || "Confirmar acción"}</h3>
        <p className={styles.mensaje}>{mensaje || "¿Estás seguro?"}</p>
        
        <div className={styles.botones}>
          <button 
            onClick={cerrarModal}
            className={styles.btnNo}
          >
            No, cancelar
          </button>
          <button 
            onClick={confirmar}
            className={styles.btnSi}
          >
            Sí, continuar
          </button>
        </div>
      </div>
    </div>
  );
}