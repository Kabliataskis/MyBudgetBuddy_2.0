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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
                facere accusamus consequuntur dignissimos quod magnam.
              </p>
            </div>

            <div className="box box__oportunities">
              <h2>Galimybes</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium alias molestiae nemo distinctio, rerum est!
              </p>
            </div>
            <div className="box box__limits">
              <h2>Limitai</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                porro at, debitis distinctio consectetur fuga.
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
