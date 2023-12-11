import React from 'react';
import './Pages.css';

function TaskPresentation() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Probléma definíció és követelmények</h2>
      <h4>Feladat és téma:</h4>
      <p>
      </p>VS Code extension fejlesztése: egy leaderboard megjelenítése, ami élőben követi a csapattagok aznapi/heti/havi teljesítményét (pl. megírt kódsorok száma).
    <p>A fejlesztendő VS Code extension célja a csapat teljesítményének követése és megjelenítése élőben. A leaderboardnak számos funkcionális és nemfunkcionális követelménynek kell megfelelnie.</p>
      <h3>Funkcionális követelmények:</h3>
        <ul style={{listStyle: 'decimal',fontSize:'18px'}}>
            <li>Csapattagok regisztrációja: A kiterjesztésnek lehetőséget kell biztosítania a csapattagok regisztrációjára, hogy azonosítani lehessen őket.</li>
            <li>Kódsorok nyomon követése: A kiterjesztésnek képesnek kell lennie a csapattagok által írt kódsorok mennyiségének követésére, és ezeket az adatokat rögzítenie kell.</li>
            <li>Leaderboard megjelenítése: Az élő leaderboardnak a VS Code felületén jelenítse meg a csapat aktuális teljesítményét az aznapi, heti és havi kategóriákban.</li> 
           </ul>
      
      <h3>Nemfunkcionális követelmények:</h3>
      <ul style={{listStyle: 'decimal',fontSize:'18px'}}>
            <li>Teljesítmény: Az extension működése során ne legyen érezhető lassulás vagy számottevő erőforrás-igény.</li>
            <li>Felhasználói élmény: A felhasználói felület legyen intuitív, könnyen kezelhető és személyre szabható.</li>
            <li>Biztonság: A regisztrált adatokat biztonságosan kell tárolni, és csak jogosult személyeknek kell hozzáférniük hozzájuk.</li> 
            <li>Skálázhatóság: Az extension könnyen skálázhatónak kell lennie, hogy több csapattaggal is zökkenőmentesen működjön.</li>
            <li>Kompatibilitás: Az extension kompatibilis legyen a legfrissebb VS Code verziókkal, és ne okozzon konfliktust más népszerű kiterjesztésekkel.</li> 
        </ul>
        <p>
Ezen követelmények figyelembevételével  képesek lesznünk egy hatékony és felhasználóbarát VS Code extension létrehozására, amely lehetővé teszi a csapat tagjai számára a teljesítményük élő követését és összehasonlítását.
</p>
    </div>
    );
}

export default TaskPresentation;
