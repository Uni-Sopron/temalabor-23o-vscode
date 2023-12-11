// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Introduction from './components/Introduction';
import TaskPresentation from './components/TaskPresentation';
import DeveloperDocumentation from './components/DeveloperDocumentation';
import UserPresentation from './components/UserPresentation';
import UserTechnological from './components/UserTechnological';
import Session from './components/Session';
import Summary from './components/Summary';

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
              <Link to="/">Bevezetés</Link>
              
            </li>

            <li>
              <Link to="/feladat-bemutatas">Probléma definíció és követelmények</Link>
            </li>
            <li>
              <Link to="/felhasznalt-technologiak">Felhasznált technológiák</Link>
            </li>
            <li>
              <Link to="/felhasznaloi-bemutatas">Felhasználói bemutatás</Link>
            </li>
            <li>
              <Link to="/fejlesztoi-dokumentácio">Fejlesztői dokumentáció</Link>
            </li>
            <li>
              <Link to="/munkamenet">Munkamenet, felosztás</Link>
            </li>
            <li>
              <Link to="/osszefoglalas">Összefoglalás</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/feladat-bemutatas" element={<TaskPresentation />} />
            <Route path="/felhasznalt-technologiak" element={<UserTechnological />} />
            <Route path="/felhasznaloi-bemutatas" element={<UserPresentation />} />
            <Route path="/fejlesztoi-dokumentácio" element={<DeveloperDocumentation />} />
            <Route path="/munkamenet" element={<Session />} />
            <Route path="/osszefoglalas" element={<Summary />} />
          </Routes>
        </main>      
      </div>
    </Router>
  );
}

export default App;
