import React, {useContext} from "react";
import { ContextProvider } from "../../App";
//css
import "./Pagrindinis_puslapis_dizainas.css";


//Grafikai
import DoughnutChart from "./Grafikai/DoughnutChart";

//Istorija
import IslaidosIstorija from "./Islaidos_istorija/IslaidosIstorija";
import PajamosIstorija from "./Pajamos_istorija/PajamosIstorija";


function Pirmas_puslapis() {
  const { modal_PajamosSuvesti, setModal_PajamosSuvesti } = useContext(ContextProvider);
  return (
    <div className="Pagrindinis-container">
      <div className="top-container">
        <div className="stats-containers">
          <div className="stat-container">
            <p>
              Biudžetas: <span className="green">399023€</span>
            </p>
          </div>
          <div className="stat-container isleista-per-men">
            <p>
              Išleista per mėn: <span className="red">329903€</span>
            </p>
          </div>
        </div>

      <div className="doughnut-chart-container"><DoughnutChart/></div>

      </div>
      <div className="history-containers">
        <div className="history-container">
          <button type="button">Įvesti išlaidas</button>
          <div className="history-top-line"></div>
         <IslaidosIstorija/>
        </div>

        <div className="history-container">
          <button type="button" onClick={() => setModal_PajamosSuvesti(true)}>Įvesti pajamas</button>
          <div className="history-top-line"></div>
          <PajamosIstorija/>
        </div>
      </div>
    </div>
  );
}

export default Pirmas_puslapis;
