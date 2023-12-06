import React from 'react';
import './Pages.css';

function TaskPresentation() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Probléma definíció és követelmények</h2>
      <p>Ennek a résznek azt kell leírnia, mi volt a feladat. Ideális esetben a saját munkáról itt egy szó sem esik, hiszen az már a feladatra adott megoldás. Érdemes egy általános folyószöveget követően a funkcionális és nem funkcionális követelményeket pontokba szedve leírni
      </p>
      
      <h3>Funkcionális követelmények:</h3>
        <ul style={{listStyle: 'decimal',fontSize:'18px'}}>
            <li>...</li>
            <li>...</li>
            <li>...</li>    
        </ul>
      
      <h3>Nemfunkcionális követelmények:</h3>
      <ul style={{listStyle: 'decimal',fontSize:'18px'}}>
            <li>...</li>
            <li>...</li>
            <li>...</li>    
        </ul>
    </div>
  );
}

export default TaskPresentation;
