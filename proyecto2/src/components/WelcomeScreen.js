import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './WelcomeScreen.css';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Bienvenido a la App para Desarrolladores Web</h1>
      <p>
        Explora sugerencias de videos, guarda tus favoritos y almacena enlaces de artículos interesantes.
      </p>
      <img
        src={logo}
        alt="Logo de la App"
        className="welcome-logo"
      />
      <button className="welcome-btn" onClick={() => navigate('/main')}>
        Comenzar
      </button>
    </div>
  );
}

export default WelcomeScreen;