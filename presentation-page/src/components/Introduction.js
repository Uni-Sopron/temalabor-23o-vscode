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
        <p>
            A témalaborok kiváló alkalmat kínálnak a csapatmunkára és a valóságos fejlesztési folyamatok elsajátítására. 
            A laborok célja, hogy a csapatok valós problémákon vagy projekteken dolgozzanak együtt, kihasználva az egyéni szakértelmet és kreativitást.
        <p> A Visual Studio Code (VSC) kiterjesztéseinek használata a fejlesztés során hatékonyabbá teheti a munkafolyamatot. Egy témalabor során a csapat fejleszthet egy VSC kiterjesztést, ötvözve a csapatmunka előnyeit a modern fejlesztőeszközökkel. Ez a projekt lehetőséget ad a csapattagoknak problémamegoldásra, 
            kommunikációra és valóságos fejlesztési készségek gyakorlására. A VSC kiterjesztés fejlesztése emellett hasznos tapasztalatokkal látja el a résztvevőket a szoftvertervezés és fejlesztés területén.
             </p>
                  
        </p>
      </div>
    </div>
  );
}

export default Home;
