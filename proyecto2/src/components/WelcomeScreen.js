import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './WelcomeScreen.css';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={logo} alt="Logo de la App" className="welcome-logo" />
        <h1>Plataforma de Recursos para Desarrolladores</h1>
        <p className="welcome-subtitle">
          Descubre, guarda y gestiona tus mejores recursos de desarrollo web, inteligencia artificial, ciberseguridad y mucho más.
        </p>
      </header>
      <main className="welcome-main">
        <section className="welcome-section">
          <h2>¿Qué puedes hacer aquí?</h2>
          <ul className="welcome-features">
            <li>🔎 <strong>Explora</strong> sugerencias de videos de YouTube por temática.</li>
            <li>⭐ <strong>Guarda</strong> tus videos y enlaces favoritos para acceder rápidamente.</li>
            <li>📚 <strong>Gestiona</strong> tus propios enlaces de artículos, tutoriales y recursos.</li>
            <li>🗂️ <strong>Organiza</strong> todo por categorías y mantén tu aprendizaje al día.</li>
          </ul>
        </section>
        <section className="welcome-section welcome-actions">
          <button className="welcome-btn" onClick={() => navigate('/main')}>
            Empezar ahora
          </button>
        </section>
      </main>
      <footer className="welcome-footer">
        <small>
          &copy; {new Date().getFullYear()} Plataforma de Recursos para Desarrolladores. Proyecto académico.
        </small>
      </footer>
    </div>
  );
}

export default WelcomeScreen;