import React, { useEffect, useState } from 'react';
import './MainScreen.css';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const todos = loadEnlaces();
    setEnlacesFavoritos(todos.filter(e => e.favorito));
    const videos = loadVideos();
    setVideosFavoritos(videos.filter(v => v.favorito));
  }, []);

  const toggleFavorito = (id) => {
    const todos = loadEnlaces();
    const actualizados = todos.map(enlace =>
      enlace.id === id ? { ...enlace, favorito: !enlace.favorito } : enlace
    );
    saveEnlaces(actualizados);
    setEnlacesFavoritos(actualizados.filter(e => e.favorito));
  };

  const toggleFavoritoVideo = (videoId) => {
    const videos = loadVideos();
    const actualizados = videos.map(video =>
      video.id.videoId === videoId ? { ...video, favorito: !video.favorito } : video
    );
    saveVideos(actualizados);
    setVideosFavoritos(actualizados.filter(v => v.favorito));
  };

  const borrarEnlace = (id) => {
    const todos = loadEnlaces();
    const filtrados = todos.filter(enlace => enlace.id !== id);
    saveEnlaces(filtrados);
    setEnlacesFavoritos(filtrados.filter(e => e.favorito));
  };

  const borrarVideo = (videoId) => {
    const videos = loadVideos();
    const filtrados = videos.filter(video => video.id.videoId !== videoId);
    saveVideos(filtrados);
    setVideosFavoritos(filtrados.filter(v => v.favorito));
  };

  return (
    <div className="main-bg">
      <div className="main-container">
        <h1 className="main-title">Tus Favoritos</h1>
        <div className="main-sections">
          <section className="main-card">
            <h2 className="main-section-title">Enlaces Favoritos</h2>
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
                    <div className="enlace-actions">
                      <button
                        className="main-fav-btn"
                        onClick={() => toggleFavorito(enlace.id)}
                        title="Quitar de favoritos"
                      >
                        Quitar favorito
                      </button>
                      <button
                        className="main-del-btn"
                        onClick={() => borrarEnlace(enlace.id)}
                        title="Borrar enlace"
                      >
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="main-card">
            <h2 className="main-section-title">Videos Favoritos</h2>
            <div className="main-list">
              <ul>
                {videosFavoritos.length === 0 && (
                  <li style={{ color: "#888" }}>No tienes videos favoritos.</li>
                )}
                {videosFavoritos.map(video => (
                  <li key={video.id.videoId} className={video.favorito ? "video-item favorito" : "video-item"}>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-link"
                    >
                      <img
                        src={video.snippet.thumbnails?.default?.url || `https://img.youtube.com/vi/${video.id.videoId}/default.jpg`}
                        alt={video.snippet.title}
                        className="video-thumb"
                      />
                      <span className="video-title">{video.snippet.title}</span>
                    </a>
                    <button
                      className="main-fav-btn video-fav-btn"
                      onClick={() => toggleFavoritoVideo(video.id.videoId)}
                      title="Quitar de favoritos"
                    >
                      Quitar favorito
                    </button>
                    <button
                      className="main-del-btn video-del-btn"
                      onClick={() => borrarVideo(video.id.videoId)}
                      title="Borrar video"
                    >
                      Borrar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
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
    </div>
  );
}

export default MainScreen;