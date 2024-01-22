import React from 'react';
import './Pages.css';

function Session() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Munkamenet felosztás</h2>
      <div style={{ marginLeft: '20px' }}>
      <p></p>
      < p>A fejlesztés a következőpéppen zajlott, december 10-én tartottunk egy megbeszélést, ahol 
      eldöntöttük ki mit fog csinálni, illetve hogy nagyából hogyan képzeljük el a projekt végigvitelét.
      Ezután december 18-án konzultáltunk a témafelelősünkkel, pontosítottuk mik az elvárások és hogy az elépzeléseink mennyire 
      felelnek meg ezeknek. Illetve, mivel csak ketten maradtunk kicsit át kellett dolgoznunk az eddig eltervezetteket.
      Hencz Balázs feladata lett a honlap elkészítése és a bemutató megírása, illetve a projekt azon részének az elkészítése, ami a github repository
       figyelése és az ott történő változások json fileba való kiexportálása jelenti.
      Kiss Gergely Pál feladata lett a json fileból való adatok kiolvasása, a kivánt módon való feldolgozása és ezek megjelenítése a vscode-ban.
      A következő meetingre január elején került sor, ahol egyeztetük ki hol tart illetve próbáltuk összehozni az a részt a projektben,
      ahol egymásnak adunk át adatokat, hogy ez működjön és mindenki tudja ez alapján folytatni a saját munkáját.
      A bemautató közeletvével egyre gyakrabban beszéltünk hol írásban, hol hívásban és próbáltuk megoldani  a gondjainkat, vagy ahol elakadt valamelyikünk.
       Ezt követően egyeztetünk módosítottuk, amit gondoltunk, kicsit szépitettünk még a kódokon, ellenőriztük egymás munkáját.</p>
      </div>
    </div>
  );
}

export default Session;
