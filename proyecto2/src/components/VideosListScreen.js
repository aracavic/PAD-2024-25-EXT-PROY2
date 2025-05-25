import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideosListScreen.css';

const categorias = [
  "Todas",
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

function VideosListScreen() {
  const [videos, setVideos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const navigate = useNavigate();

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('videosGuardados') || '[]');
    setVideos(guardados);
  }, []);

  const borrarVideo = (videoId) => {
    const nuevos = videos.filter(v => v.id.videoId !== videoId);
    setVideos(nuevos);
    localStorage.setItem('videosGuardados', JSON.stringify(nuevos));
  };

  const toggleFavorito = (videoId) => {
    const nuevos = videos.map(v =>
      v.id.videoId === videoId
        ? { ...v, favorito: !v.favorito }
        : v
    );
    setVideos(nuevos);
    localStorage.setItem('videosGuardados', JSON.stringify(nuevos));
  };

  const videosFiltrados = categoriaSeleccionada === "Todas"
    ? videos
    : videos.filter(video => {
        if (video.categoria) {
          return video.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase();
        }
        return (
          video.snippet &&
          video.snippet.title &&
          video.snippet.title.toLowerCase().includes(categoriaSeleccionada.toLowerCase())
        );
      });

  return (
    <div className="videos-list-container">
      <h2 className="videos-title">Videos Guardados</h2>
      <select
        className="videos-select"
        value={categoriaSeleccionada}
        onChange={e => setCategoriaSeleccionada(e.target.value)}
        style={{ marginBottom: 16 }}
      >
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="videos-list">
        {videosFiltrados.length === 0 && (
          <div className="videos-loading">No tienes videos guardados en esta categoría.</div>
        )}
        <ul>
          {videosFiltrados.map(video => (
            <li key={video.id.videoId} className={video.favorito ? "video-item favorito" : "video-item"}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
              >
                <img
                  src={video.snippet.thumbnails.default.url}
                  alt={video.snippet.title}
                  className="video-thumb"
                />
                <span className="video-title">{video.snippet.title}</span>
              </a>
              <button
                className="video-fav-btn"
                onClick={() => toggleFavorito(video.id.videoId)}
                style={{ marginLeft: 8 }}
                title={video.favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {video.favorito ? "Quitar favorito" : "Agregar favorito"}
              </button>
              <button
                className="video-del-btn"
                onClick={() => borrarVideo(video.id.videoId)}
                style={{ marginLeft: 8 }}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="videos-add-btn"
        style={{ marginTop: 16, marginBottom: 16 }}
        onClick={() => navigate('/sugerencias')}
      >
        Ir a Sugerencias
      </button>
      <button
        className="videos-add-btn"
        onClick={() => navigate('/añadir-video')}
      >
        Agregar Video Manualmente
      </button>
    </div>
  );
}

export default VideosListScreen;