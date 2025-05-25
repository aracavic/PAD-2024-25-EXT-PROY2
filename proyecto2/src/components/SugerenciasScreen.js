import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SugerenciasScreen.css';

// Nuevas categorías según tu petición
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

const YOUTUBE_API_KEY = "AIzaSyCicZjH6HP1Hc1laFh_VHrnt0hr65Of5cs"; // Tu API Key
const DEFAULT_QUERY = "desarrollo web";

function SugerenciasScreen() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [videos, setVideos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetchVideos(DEFAULT_QUERY);
    // eslint-disable-next-line
  }, []);

  const fetchVideos = async (query) => {
    setCargando(true);
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            type: 'video',
            maxResults: 10,
            q: query,
            key: YOUTUBE_API_KEY
          }
        }
      );
      setVideos(response.data.items || []);
    } catch (error) {
      setVideos([]);
    }
    setCargando(false);
  };

  const handleCategoriaChange = (cat) => {
    setCategoriaSeleccionada(cat);
    fetchVideos(cat === "Todas" ? DEFAULT_QUERY : cat);
  };

  const guardarVideo = (video) => {
    const guardados = JSON.parse(localStorage.getItem('videosGuardados') || '[]');
    // Evita duplicados
    if (!guardados.some(v => v.id.videoId === video.id.videoId)) {
      // Añade la categoría seleccionada al objeto video
      const videoConCategoria = { ...video, categoria: categoriaSeleccionada };
      guardados.push(videoConCategoria);
      localStorage.setItem('videosGuardados', JSON.stringify(guardados));
      alert('¡Video guardado!');
    } else {
      alert('Este video ya está guardado.');
    }
  };

  return (
    <div className="videos-container">
      <h2 className="videos-title">Lista de Videos</h2>
      <select
        className="videos-select"
        value={categoriaSeleccionada}
        onChange={e => handleCategoriaChange(e.target.value)}
      >
        {categorias.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="videos-list">
        {cargando && <div className="videos-loading">Cargando videos...</div>}
        {!cargando && (
          <ul>
            {videos.map(video => (
              <li key={video.id.videoId} className="video-item">
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
                  className="video-save-btn"
                  onClick={() => guardarVideo(video)}
                  style={{ marginLeft: 8 }}
                >
                  Guardar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="videos-add-btn"
        onClick={() => fetchVideos(DEFAULT_QUERY)}
      >
        Nuevos Videos
      </button>
    </div>
  );
}

export default SugerenciasScreen;