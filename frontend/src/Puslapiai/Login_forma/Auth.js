import React, { useState } from "react";
import "./Login_forma_dizainas.css";
import "./Login_forma.js";
import "./Register_forma";
import Login from "./Login_forma.js";
import Register from "./Register_forma";

export const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="main-container">
      <main className="content-container">
        <div className="boxes">
            <div className="box box__about-aplication">
              <h2>Apie Aplikacija</h2>
              <p>
                Asmeninio biudžeto analizės aplikacija skirta išmintingai valdyti savo finansus -vesti pajamų ir išlaidų biudžetą.
              </p>
            </div>

            <div className="box box__oportunities">
              <h2>Galimybes</h2>
              <p>
                Kiekvienas aplikacijos vartotojas turi galimybę realiu laiku patikrinti bendro biudžeto likutį, susipažinti su jį analizuo- jančiais grafikais
              </p>
            </div>
            <div className="box box__limits">
              <h2>Limitai</h2>
              <p>
                Aplikacijoje vartotojas gali priskirti tam tikras sumas skirtingoms kategorijomis, o  vėliau fiksuoti savo išlaidasm stengiantis neviršyti numatyto biudžo
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
