import React, { useState, useEffect } from "react";
import "./Auth.css";
import Login from "./Login.js";
import Register from "./Register";

export const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="main-container Auth">
      <main className="content-container">
        <div className="boxes">
            <div className="box box__about-aplication">
              <h2>Apie aplikaciją</h2>
              <p>
                Asmeninio biudžeto analizės aplikacija skirta išmintingai valdyti savo finansus - vesti pajamų ir išlaidų biudžetą.
              </p>
            </div>

            <div className="box box__oportunities">
              <h2>Galimybės</h2>
              <p>
                Kiekvienas aplikacijos vartotojas turi galimybę realiu laiku patikrinti bendro biudžeto likutį, susipažinti su jį analizuojančiais grafikais.
              </p>
            </div>
            <div className="box box__limits">
              <h2>Limitai</h2>
              <p>
                Aplikacijoje vartotojas gali priskirti tam tikras sumas skirtingoms kategorijoms, o  vėliau fiksuoti savo išlaidas, stengiantis neviršyti numatyto biudžeto.
              </p>
            </div>
        </div>
        {showLogin ? (
          <Login setShowLogin={setShowLogin} />
        ) : (
          <Register setShowLogin={setShowLogin} />
        )}
      </main>
    </div>
  );
};

export default Auth;
