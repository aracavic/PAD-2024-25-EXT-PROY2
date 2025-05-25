import React, { useState, useEffect } from 'react';
import './LinksListScreen.css';
import AddLinkScreen from './AddLinkScreen';

// Temáticas actualizadas según tu petición
const categorias = [
  "Todas",
  "Inteligencia Artificial",
  "Ciencia de Datos",
  "Ciberseguridad",
  "Desarrollo Web",
  "Diseño UX/UI",
  "Cloud Computing",
  "DevOps",
  "Software Libre"
];

// Funciones para LocalStorage
function loadEnlaces() {
  try {
    const data = localStorage.getItem('enlaces');
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEnlaces(enlaces) {
  localStorage.setItem('enlaces', JSON.stringify(enlaces));
}

function LinksListScreen() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [showAdd, setShowAdd] = useState(false);
  const [enlaces, setEnlaces] = useState([]);
  const [cargado, setCargado] = useState(false);

  // Cargar enlaces al montar el componente (solo una vez)
  useEffect(() => {
    setEnlaces(loadEnlaces());
    setCargado(true);
  }, []);

  // Guardar enlaces en LocalStorage cada vez que cambian, pero solo después de cargar
  useEffect(() => {
    if (cargado) {
      saveEnlaces(enlaces);
    }
  }, [enlaces, cargado]);

  const enlacesFiltrados = Array.isArray(enlaces)
    ? (categoriaSeleccionada === "Todas"
        ? enlaces
        : enlaces.filter(e => e.categoria === categoriaSeleccionada))
    : [];

  // Alternar favorito
  const toggleFavorito = (id) => {
    setEnlaces(prev =>
      prev.map(enlace =>
        enlace.id === id ? { ...enlace, favorito: !enlace.favorito } : enlace
      )
    );
  };

  // Borrar enlace
  const borrarEnlace = (id) => {
    setEnlaces(prev => prev.filter(enlace => enlace.id !== id));
  };

  return (
    <div className="links-container">
      <h2 className="links-title">Lista de Enlaces</h2>
      <select
        className="links-select"
        value={categoriaSeleccionada}
        onChange={e => setCategoriaSeleccionada(e.target.value)}
      >
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="links-list">
        <ul>
          {enlacesFiltrados.map(enlace => (
            <li key={enlace.id} className={enlace.favorito ? "favorito" : ""}>
              <a href={enlace.url} target="_blank" rel="noopener noreferrer">
                {enlace.titulo}
              </a>
              <span className="links-categoria">({enlace.categoria})</span>
              {enlace.favorito && <span className="links-star">★</span>}
              <button
                className="links-fav-btn"
                onClick={() => toggleFavorito(enlace.id)}
                title={enlace.favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {enlace.favorito ? "Quitar favorito" : "Agregar favorito"}
              </button>
              <button
                className="links-del-btn"
                onClick={() => borrarEnlace(enlace.id)}
                title="Borrar enlace"
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showAdd ? (
        <AddLinkScreen
          onSave={nuevoEnlace => {
            setEnlaces(prev => [...prev, nuevoEnlace]);
            setShowAdd(false);
          }}
          onCancel={() => setShowAdd(false)}
        />
      ) : (
        <button className="links-add-btn" onClick={() => setShowAdd(true)}>
          Agregar Enlace
        </button>
      )}
    </div>
  );
}

export default LinksListScreen;