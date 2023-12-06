import React from 'react';
import './Pages.css';


function Home() {
  return (
    <div>
      <div className='background-container'></div>
      <div className='maintext'>
        <h2 style={{textAlign: 'center'}}>Témalabor: </h2>
        <h2 style={{textAlign: 'center'}}>VS Code extension fejlesztése</h2>
        <h3 style={{textAlign: 'left', marginBottom: '20px', marginTop:'80px'}}>Csapattagok: </h3>
        <ul>
          <li>Horváth Roland Tamás</li>
          <li>Kiss Gergely Pál</li>
          <li>Hencz Balázs</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
