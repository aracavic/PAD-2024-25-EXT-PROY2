import React, { useState } from 'react';
import './AddLinkScreen.css';

// Nuevas temáticas según tu petición
const categorias = [
  "Inteligencia Artificial",
  "Ciencia de Datos",
  "Ciberseguridad",
  "Desarrollo Web",
  "Diseño UX/UI",
  "Cloud Computing",
  "DevOps",
  "Software Libre"
];

function AddLinkScreen({ onSave, onCancel }) {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);
  const [favorito, setFavorito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !url) return;
    onSave({
      id: Date.now(),
      titulo,
      url,
      categoria,
      favorito
    });
  };

  return (
    <form className="addlink-form" onSubmit={handleSubmit}>
      <h2>Agregar Enlace</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="addlink-input"
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        className="addlink-input"
        required
      />
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        className="addlink-select"
      >
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <label className="addlink-checkbox">
        <input
          type="checkbox"
          checked={favorito}
          onChange={e => setFavorito(e.target.checked)}
        />
        Favorito
      </label>
      <div className="addlink-buttons">
        <button type="submit" className="addlink-btn">Guardar</button>
        <button type="button" className="addlink-btn addlink-btn-cancel" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default AddLinkScreen;