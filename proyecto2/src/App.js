import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import MainScreen from './components/MainScreen';
import LinksListScreen from './components/LinksListScreen';
import SugerenciasScreen from './components/SugerenciasScreen';
import VideosListScreen from './components/VideosListScreen';
import AddVideoScreen from './components/AddVideoScreen';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/enlaces" element={<LinksListScreen />} />
        <Route path="/sugerencias" element={<SugerenciasScreen />} />
        <Route path="/videos" element={<VideosListScreen />} />
        <Route path="/añadir-video" element={<AddVideoScreen />} />
      </Routes>
    </HashRouter>
  );
}

export default App;