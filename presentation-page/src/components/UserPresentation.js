import React from 'react';
import './Pages.css';

function UserPresentation() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Felhasználói bemutatás</h2>
      <p>

Az alábbiakban egy rövid leírás található arról, hogy hogyan használhatja a kiterjesztést a Visual Studio Code felhasználója.
<h5 className='tittles'>Telepítés:</h5>
A felhasználó a Visual Studio Code bővítmények menüjében keresi meg a leaderboard kiterjesztést, majd telepíti azt egy kattintással.
<h5 className='tittles'>Elérés a Menüből:</h5>
A felhasználó a VS Code bal oldali menüsorában találhatja meg a "Leaderboard" menüpontot. Egy kattintással megnyithatja a leaderboard ablakot.
<h5 className='tittles'>Leaderboard Nézet:</h5>
Az előző lépés után megnyílik a leaderboard nézet, ahol a felhasználó számos lehetőséget talál a csapattagok teljesítményének követésére. Az ablak tartalmazza az aktuális nap, hét és hónap vezetőit.
<h5 className='tittles'>Csapattagok Részletei:</h5>
A felhasználó egy kattintással megtekintheti a csapattagok részletes teljesítményét. Ez magában foglalhatja a megírt kódsorok számát, az elkövetett hibákat vagy más egyedi teljesítmény mutatókat.
<h5 className='tittles'>Dinamikus Frissítés:</h5>
A leaderboard dinamikusan frissül, ahogy a csapattagok tovább dolgoznak. Az adatok naponta, hetente és havi rendszerességgel frissülnek, így mindig naprakész információkat láthat a felhasználó.
</p>
    </div>
  );
}

export default UserPresentation;
