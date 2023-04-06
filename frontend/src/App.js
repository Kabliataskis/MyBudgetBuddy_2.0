import React, { useState, useContext, createContext } from "react";
import Navbar from "./Puslapiai/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Pajamos from "./Puslapiai/Pajamos/Pajamos";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";
import Pirmas_puslapis from "./Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis";
export const ContextProvider = createContext();
function App() {
  const [modal_PajamosSuvesti, setModal_PajamosSuvesti] = useState(false);
  return (
    <div className="App">
      <ContextProvider.Provider
        value={{ modal_PajamosSuvesti, setModal_PajamosSuvesti }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Pirmas_puslapis />} />
            <Route
              path="/pajamos"
              element={
                <>
                  <Pajamos /> <PajamosSuvesti />{" "}
                </>
              }
            />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ContextProvider.Provider>
    </div>
  );
}

export default App;
