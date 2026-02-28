"use client";
import { createContext, useState, useContext, useEffect } from "react";
import productosOriginales from "../datos/productos.json";

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const savedProductos = localStorage.getItem('productos');
    const savedCarrito = localStorage.getItem('carrito');
    const savedUsuario = localStorage.getItem('usuario');

    setProductos(savedProductos ? JSON.parse(savedProductos) : productosOriginales);
    setCarrito(savedCarrito ? JSON.parse(savedCarrito) : []);
    setUsuario(savedUsuario ? JSON.parse(savedUsuario) : null);
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    if (productos.length > 0) {
      localStorage.setItem('productos', JSON.stringify(productos));
    }
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  // Escuchar cambios en otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'productos' && e.newValue) {
        setProductos(JSON.parse(e.newValue));
      }
      if (e.key === 'carrito' && e.newValue) {
        setCarrito(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // AGREGAR AL CARRITO
  const agregarAlCarrito = (producto, cantidad = 1) => {
    const productoActual = productos.find(p => p.id === producto.id);
    
    if (!productoActual || productoActual.stock === 0) {
      alert(`❌ ${producto.nombre} está agotado`);
      return false;
    }

    if (cantidad > productoActual.stock) {
      alert(`❌ Solo hay ${productoActual.stock} unidades disponibles de ${producto.nombre}`);
      return false;
    }

    // Verificar si ya existe en el carrito
    const existeEnCarrito = carrito.find(item => item.id === producto.id);
    
    let nuevoCarrito = [...carrito];
    
    if (existeEnCarrito) {
      nuevoCarrito = carrito.map(item => 
        item.id === producto.id 
          ? { 
              ...item, 
              cantidad: item.cantidad + cantidad
            }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { 
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        descripcion: producto.descripcion,
        cantidad: cantidad
      }];
    }

    // Actualizar stock en productos (DISMINUYE)
    const nuevosProductos = productos.map(p => 
      p.id === producto.id 
        ? { ...p, stock: p.stock - cantidad }
        : p
    );

    setProductos(nuevosProductos);
    setCarrito(nuevoCarrito);
    
    return true;
  };

  // ELIMINAR DEL CARRITO
  const eliminarDelCarrito = (id) => {
    const item = carrito.find(item => item.id === id);
    
    if (item) {
      // Devolver stock a productos (AUMENTA)
      const nuevosProductos = productos.map(p => 
        p.id === id 
          ? { ...p, stock: p.stock + item.cantidad }
          : p
      );
      const nuevoCarrito = carrito.filter(item => item.id !== id);
      
      setProductos(nuevosProductos);
      setCarrito(nuevoCarrito);
    }
  };

  // ACTUALIZAR CANTIDAD
  const actualizarCantidad = (id, nuevaCantidad) => {
    const item = carrito.find(item => item.id === id);
    const productoEnStock = productos.find(p => p.id === id);
    
    if (!item || !productoEnStock) return;

    const diferencia = nuevaCantidad - item.cantidad;

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
    } else if (diferencia > 0) {
      // Está aumentando - VERIFICAR STOCK
      if (diferencia <= productoEnStock.stock) {
        const nuevosProductos = productos.map(p => 
          p.id === id ? { ...p, stock: p.stock - diferencia } : p
        );
        const nuevoCarrito = carrito.map(item =>
          item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        );
        
        setProductos(nuevosProductos);
        setCarrito(nuevoCarrito);
      } else {
        alert(`❌ Solo hay ${productoEnStock.stock} unidades disponibles`);
      }
    } else {
      // Está disminuyendo - DEVOLVER STOCK
      const nuevosProductos = productos.map(p => 
        p.id === id ? { ...p, stock: p.stock - diferencia } : p  // diferencia es negativo
      );
      const nuevoCarrito = carrito.map(item =>
        item.id === id ? { ...item, cantidad: nuevaCantidad } : item
      );
      
      setProductos(nuevosProductos);
      setCarrito(nuevoCarrito);
    }
  };

  // VACIAR CARRITO
  const vaciarCarrito = () => {
    let nuevosProductos = [...productos];
    carrito.forEach(item => {
      nuevosProductos = nuevosProductos.map(p => 
        p.id === item.id 
          ? { ...p, stock: p.stock + item.cantidad }
          : p
      );
    });
    
    setProductos(nuevosProductos);
    setCarrito([]);
  };

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const login = (user) => {
    setUsuario(user);
  };

  const logout = () => {
    setUsuario(null);
    setCarrito([]);
    setProductos(productosOriginales);
    localStorage.clear();
  };

  const finalizarCompra = () => {
    alert("✅ ¡Compra realizada con éxito!");
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      usuario,
      productos,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      actualizarCantidad,
      totalProductos,
      totalPrecio,
      login,
      logout,
      finalizarCompra,
    }}>
      {children}
    </CarritoContext.Provider>
  );
};