import React from 'react';
import './Pages.css';

function DeveloperDocumentation() {
  return (
    <div className='maintext'>
    <div className='background-container'></div>
      <h2>Fejlesztői dokumentáció</h2>
      <p>Ez az a rész, ahol a technikai részleteket le lehet és 
        le is kell írni. Érdemes valamilyen keretbe foglalni, 
        hasznos egy felvezetés, ami az egyes alfejezetek tartalmát
         előrevetíti, összeköti. Nem egzakt a határvonal, hogy hány 
         sorig emelünk be inline kódot, és mennyitől linkeljük csak.
          Ökölszabályként azt mondanám, hogy 5-10, max 15 sorokat 
          még be lehet emelni, ennél többet már csak linkeljetek.</p>
    </div>
  );
}

export default DeveloperDocumentation;
