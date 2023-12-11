import React from 'react';
import './Pages.css';

function Summary() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Összefoglalás</h2>
      <p>

A leaderboard kiterjesztés sikeresen létrehoz egy hatékony eszközt a csapatok 
teljesítményének nyomon követéséhez a Visual Studio Code-ban. 
Az egyszerű telepítés, a felhasználóbarát felület és az élő frissítések 
lehetővé teszik a felhasználók számára, hogy könnyen nyomon kövessék és 
összehasonlítsák a csapattagok fejlődését.

<h5 className='tittles'>Továbbfejlesztési Lehetőségek:</h5>
<ul style={{listStyle: 'decimal',fontSize:'20px',lineHeight:'2'}}>
            <li><b>Több Mértékrendszer:</b> Bővítsd a kiterjesztést, hogy támogassa a különböző teljesítménymértékek követését (pl. hibák száma, kommentek száma).</li>
            <li><b>Részletesebb Statisztikák:</b> Adjon hozzá további részletes statisztikákat, amelyek bemutatják a kódminőséget, az időfordítást és egyedi teljesítménymutatókat.</li>
            <li><b>Felhasználói Profilok:</b> Hozz létre személyes profilt minden felhasználónak, ahol részletesen bemutatható a kódoktatásuk, az elért célok és a fejlődésük.</li>
            <li><b>Egyéni Beállítások:</b> Nyújts lehetőséget a felhasználóknak, hogy testre szabják a kiterjesztés beállításait az egyéni igényeik szerint.</li>
            <li><b>Értesítések:</b> Integrálj automatikus értesítéseket, hogy a csapattagok azonnal értesüljenek a frissítésekről vagy új eredményekről.</li>
          </ul>

A kiterjesztés tervezett verziója egy hatékony eszközt fog kínálni a csapatok teljesítményének nyomon követéséhez, de a fenti továbbfejlesztési lehetőségekkel még további funkcionalitásokat és testreszabhatóságot lehet elérni. Ezek az újítások tovább növelhetik a kiterjesztés értékét és szélesebb körű alkalmazhatóságát.</p>
    </div>
  );
}

export default Summary;
