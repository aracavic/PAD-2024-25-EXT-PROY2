import React, { useEffect, useState } from 'react';
import './MainScreen.css';
import { useNavigate } from 'react-router-dom';

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

function loadVideos() {
  try {
    const data = localStorage.getItem('videosGuardados');
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEnlaces(enlaces) {
  localStorage.setItem('enlaces', JSON.stringify(enlaces));
}

function saveVideos(videos) {
  localStorage.setItem('videosGuardados', JSON.stringify(videos));
}

function MainScreen() {
  const [enlacesFavoritos, setEnlacesFavoritos] = useState([]);
  const [videosFavoritos, setVideosFavoritos] = useState([]);
  const navigate = useNavigate();

  // Cargar favoritos al montar
  useEffect(() => {
    const todos = loadEnlaces();
    setEnlacesFavoritos(todos.filter(e => e.favorito));
    const videos = loadVideos();
    setVideosFavoritos(videos.filter(v => v.favorito));
  }, []);

  // Actualizar favoritos si se modifica algún enlace
  const refreshFavoritos = () => {
    const todos = loadEnlaces();
    setEnlacesFavoritos(todos.filter(e => e.favorito));
    const videos = loadVideos();
    setVideosFavoritos(videos.filter(v => v.favorito));
  };

  // Quitar de favoritos (enlaces)
  const toggleFavorito = (id) => {
    const todos = loadEnlaces();
    const actualizados = todos.map(enlace =>
      enlace.id === id ? { ...enlace, favorito: !enlace.favorito } : enlace
    );
    saveEnlaces(actualizados);
    setEnlacesFavoritos(actualizados.filter(e => e.favorito));
  };

  // Quitar de favoritos (videos)
  const toggleFavoritoVideo = (videoId) => {
    const videos = loadVideos();
    const actualizados = videos.map(video =>
      video.id.videoId === videoId ? { ...video, favorito: !video.favorito } : video
    );
    saveVideos(actualizados);
    setVideosFavoritos(actualizados.filter(v => v.favorito));
  };

  // Borrar enlace
  const borrarEnlace = (id) => {
    const todos = loadEnlaces();
    const filtrados = todos.filter(enlace => enlace.id !== id);
    saveEnlaces(filtrados);
    setEnlacesFavoritos(filtrados.filter(e => e.favorito));
  };

  // Borrar video
  const borrarVideo = (videoId) => {
    const videos = loadVideos();
    const filtrados = videos.filter(video => video.id.videoId !== videoId);
    saveVideos(filtrados);
    setVideosFavoritos(filtrados.filter(v => v.favorito));
  };

  return (
    <div className="main-container">
      <h2 className="main-title">Lista de Enlaces Favoritos</h2>
      <div className="main-list">
        <ul>
          {enlacesFavoritos.length === 0 && (
            <li style={{ color: "#888" }}>No tienes enlaces favoritos.</li>
          )}
          {enlacesFavoritos.map(enlace => (
            <li key={enlace.id}>
              <a href={enlace.url} target="_blank" rel="noopener noreferrer">
                {enlace.titulo}
              </a>
              <button
                className="main-fav-btn"
                onClick={() => toggleFavorito(enlace.id)}
                title="Quitar de favoritos"
                style={{ marginLeft: 8 }}
              >
                Quitar favorito
              </button>
              <button
                className="main-del-btn"
                onClick={() => borrarEnlace(enlace.id)}
                title="Borrar enlace"
                style={{ marginLeft: 8 }}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="main-title">Lista de Videos Favoritos</h2>
      <div className="main-list">
        <ul>
          {videosFavoritos.length === 0 && (
            <li style={{ color: "#888" }}>No tienes videos favoritos.</li>
          )}
          {videosFavoritos.map(video => (
            <li key={video.id.videoId} style={{ position: 'relative', minHeight: 70 }}>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <img
                  src={video.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${video.id.videoId}/default.jpg`}
                  alt={video.snippet.title}
                  className="video-thumb"
                  style={{ width: 80, height: 60, borderRadius: 6, objectFit: 'cover' }}
                />
                <span className="video-title">{video.snippet.title}</span>
              </a>
              <div style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                display: 'flex',
                gap: '6px'
              }}>
                <button
                  className="main-fav-btn"
                  onClick={() => toggleFavoritoVideo(video.id.videoId)}
                  title="Quitar de favoritos"
                >
                  Quitar favorito
                </button>
                <button
                  className="main-del-btn"
                  onClick={() => borrarVideo(video.id.videoId)}
                  title="Borrar video"
                >
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-buttons">
        <button className="main-btn" onClick={() => navigate('/enlaces')}>
          Gestionar Enlaces
        </button>
        <button className="main-btn main-btn-green" onClick={() => navigate('/videos')}>
          Gestionar Videos
        </button>
      </div>
    </div>
  );
}

export default MainScreen;