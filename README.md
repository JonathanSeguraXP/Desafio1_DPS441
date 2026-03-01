# 🛒 Tienda de Tecnología - DPS441

Aplicación web de tienda en línea desarrollada con **Next.js** y **React** para la venta de productos tecnológicos (hardware y software).


## 📹 Video Demostrativo


## 📋 Requisitos del Proyecto
- ✅ Login con usuario/contraseña (JSON simulado)
- ✅ Catálogo con 20+ productos tecnológicos
- ✅ Carrito de compras funcional
- ✅ Agregar, vaciar y eliminar productos
- ✅ Imágenes en el carrito (izquierda)
- ✅ Mensajes de confirmación (eliminar/vaciar)
- ✅ Generación de factura con PDF
- ✅ Stock dinámico en tiempo real
- ✅ Diseño responsive

## 🔑 Credenciales de Prueba
| Usuario | Contraseña |
|---------|------------|
| admin | 123456 |
| estudiante | dps441 |

## 🛠️ Tecnologías Utilizadas
- **Next.js 14** - Framework de React
- **React 18** - Biblioteca UI
- **CSS Modules** - Estilos
- **Context API** - Estado global
- **localStorage** - Persistencia
- **html2pdf.js** - Generación de PDF


## ✨ Funcionalidades Principales

### 🔐 Login
- Autenticación con usuarios desde JSON
- Validación de credenciales
- Redirección automática

### 🏷️ Catálogo de Productos
- 21 productos con imágenes únicas
- Stock en tiempo real
- Selector de cantidad antes de agregar
- Indicadores visuales de stock:
  - 🟢 Stock normal (>10)
  - 🟡 Stock bajo (≤10)
  - 🔴 Stock crítico (≤3)
  - ⚫ Agotado

### 🛒 Carrito de Compras
- Agregar productos con cantidad seleccionada
- Aumentar/disminuir cantidades
- Eliminar productos con confirmación
- Vaciar carrito con confirmación
- Stock sincronizado en tiempo real
- Imágenes a la izquierda del producto

### 📄 Factura en PDF
- Generación de factura con datos reales
- Cálculo de IVA (13%) para dicho escenario
- Información del cliente y vendedor
- Descarga automática en PDF
- Botón para finalizar compra

### 🔄 Sincronización
- Stock actualizado entre pestañas
- localStorage para persistencia
- Context API para estado global

## 💻 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/JonathanSeguraXP/Desafio1_DPS441.git

# Entrar al directorio
cd tiendaenlinea

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
