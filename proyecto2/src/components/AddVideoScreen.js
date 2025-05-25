import React, { useState } from 'react';
import './AddVideoScreen.css';

const categorias = [
  "Programación",
  "Desarrollo móvil",
  "Kotlin",
  "Java",
  "Apps Android",
  "Desarrollador software",
  "Tutorial Android",
  "API REST",
  "Firebase",
  "SQLite Android"
];

function AddVideoScreen({ navigate }) {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [categoria, setCategoria] = useState(categorias[0]);

  const obtenerIdVideo = (url) => {
    // Extrae el ID del video de una URL de YouTube estándar
    const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!titulo.trim() || !url.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const videoId = obtenerIdVideo(url);
    if (!videoId) {
      alert('URL de YouTube no válida.');
      return;
    }

    const nuevoVideo = {
      id: { videoId },
      snippet: {
        title: titulo,
        thumbnails: {
          default: {
            url: `https://img.youtube.com/vi/${videoId}/default.jpg`
          }
        }
      },
      categoria,
      favorito: false
    };

    const guardados = JSON.parse(localStorage.getItem('videosGuardados') || '[]');
    if (guardados.some(v => v.id.videoId === videoId)) {
      alert('Este video ya está guardado.');
      return;
    }
    guardados.push(nuevoVideo);
    localStorage.setItem('videosGuardados', JSON.stringify(guardados));
    alert('¡Video guardado!');
    setTitulo('');
    setUrl('');
    setCategoria(categorias[0]);
    if (navigate) navigate('/videos');
  };

  return (
    <div className="agregar-video-container">
      <h2 className="videos-title">Agregar Video Manualmente</h2>
      <form className="agregar-video-form" onSubmit={handleGuardar}>
        <input
          type="text"
          placeholder="Título del Video"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="agregar-video-input"
        />
        <input
          type="text"
          placeholder="URL del Video"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="agregar-video-input"
        />
        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="agregar-video-select"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="agregar-video-btn">
          Guardar Video
        </button>
      </form>
    </div>
  );
}

export default AddVideoScreen;