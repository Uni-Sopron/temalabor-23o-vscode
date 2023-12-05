// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import TaskDescription from './components/TaskDescription';
import TaskPresentation from './components/TaskPresentation';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* Kék csík a képernyő tetején */}
        <div className="header-bar"></div>

        <header>
          {/* Logo */}
          <img src="./img/logo.png" alt="Logo" className="logo" />
        </header>

        <nav>
          <ul>
            <li>
              <Link to="/">Kezdőoldal</Link>
            </li>
            <li>
              <Link to="/feladat-leiras">Feladat Leírása</Link>
            </li>
            <li>
              <Link to="/feladat-bemutatas">Feladat Bemutatása</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feladat-leiras" element={<TaskDescription />} />
            <Route path="/feladat-bemutatas" element={<TaskPresentation />} />
          </Routes>
        </main>      
      </div>
    </Router>
  );
}

export default App;
