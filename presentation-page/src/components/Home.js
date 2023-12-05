// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <div className='background-container'></div>
      <div className='text'>
        <h2>Témalabor: </h2>
        <h2>VS Code extension fejlesztése</h2>
        <ul>
          <li>Csapattagok:</li>
          <li>- Horváth Roland Tamás</li>
          <li>- Kiss Gergely Pál</li>
          <li>- Hencz Balázs</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
