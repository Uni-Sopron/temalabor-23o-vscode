import React from 'react';
import './Pages.css';

function UserTechnological() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Felhasznált technológiák</h2>
      <p>A leaderboard kiterjesztés fejlesztése során számos technológia és eszköz kerül felhasználásra, mind a fejlesztői környezet, mind a végtermék részeként.

<h5 className='tittles'>TypeScript:</h5>
   A TypeScript a fejlesztéshez használt fő programozási nyelv. A JavaScript kiterjesztése, statikus típusokkal, ami segít a kód biztonságosabbá és karbantarthatóbbá tételében. TypeScript támogatás elengedhetetlen a Visual Studio Code kiterjesztések fejlesztéséhez.
<h5 className='tittles'>Visual Studio Code:</h5>
   Az Visual Studio Code egy könnyűsúlyú, erőteljes kódszerkesztő, amelyet a kiterjesztés fejlesztési folyamatban használtunk. Az integrált fejlesztői környezet és a bővítmények széles választéka miatt kiváló választás a VS Code kiterjesztésekhez.
<h5 className='tittles'>Axios:</h5>
Az Axios egy könnyűsúlyú HTTP kliens, amelyet a leaderboard kiterjesztés alkalmaz az élő adatok lekérdezéséhez és frissítéséhez. A könnyű használhatóság és a keresztkliens támogatás miatt választottuk ezt az eszközt.
<h5 className='tittles'>Moment.js:</h5>
A Moment.js egy időkezelő könyvtár, amelyet a dátumok és idők formázásához, manipulálásához használtunk a leaderboardon. Egyszerű és hatékony módon kezeli az időt, ami kulcsfontosságú a teljesítmény adatok megjelenítésében.
<h5 className='tittles'>JSON:</h5>
Az adatok tárolásához és kommunikációjához JSON-t használtunk. A JSON (JavaScript Object Notation) egyszerű, könnyen olvasható és írható, és jól támogatott a különböző nyelvek és platformok közötti adatkommunikációban.
<h5 className='tittles'>Miért ezek az eszközök?</h5>

Ezeket az eszközöket választottuk a fejlesztés során, mert:
- A TypeScript segít a kód megbízhatóságában és karbantarthatóságában.
- A Visual Studio Code integrált kiterjesztési támogatást biztosít.
- Az Axios könnyűsúlyú és hatékony HTTP kliensként alkalmazható.
- A Moment.js könnyen kezelhetővé teszi az idővel kapcsolatos műveleteket.
- A JSON egyszerű és könnyen olvasható, ideális adatok tárolásához és kommunikációjához.

Alternatívákat is megfontoltunk, de ezek az eszközök együttesen a fejlesztési célok és a könnyű integráció miatt bizonyultak optimálisnak a projektünk számára.</p>
<h5 className='tittles'>Gyakran használt oldalak:</h5>

  <div>
    <a href="https://code.visualstudio.com/api" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
      Visual Studio Code API dokumentáció
    </a>

    <a href="https://marketplace.visualstudio.com/items?itemName=uctakeoff.vscode-counter" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
      Visual Studio Code Counter Extension
    </a>

    <a href="https://marketplace.visualstudio.com/items?itemName=vizzuhq.code-viz-stat" style={{ fontSize: '16px', display: 'block' }}>
      Visual Studio Code Stat Extension
    </a>
  </div>
  
    </div>

  );
}

export default UserTechnological;
