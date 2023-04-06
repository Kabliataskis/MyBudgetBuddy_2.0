import React, {useState, useContext, createContext } from 'react';
import Navbar from './Puslapiai/Navbar/Navbar';
import Pajamos from './Puslapiai/Pajamos/Pajamos';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "./index.css";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";
import Pirmas_puslapis from "./Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis";
import Islaidos from "./Puslapiai/Islaidos/Islaidos";
import Biudzetas from "./Puslapiai/Biudzetas/Biudzietas";
import Istorija from "./Puslapiai/Istorija/Istorija";
export const ContextProvider = createContext();
function App() {
  const [modal_PajamosSuvesti, setModal_PajamosSuvesti] = useState(false);
  return (
    <div className="App">
      <ContextProvider.Provider value={{ modal_PajamosSuvesti, setModal_PajamosSuvesti}}>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/pagrindinis' element={<Pirmas_puslapis />} />
          <Route path='/pajamos' element={<><Pajamos/> <PajamosSuvesti/> </>}/>
          <Route path='/islaidos' element={<Islaidos />} />
          <Route path='/biudzetas' element={<Biudzetas />} />
          {/* <Route path='/admin' element={<Admin />} /> */}
          <Route path='/istorija' element={<Istorija />} />

        </Routes>
      </Router>
      {/* <Pajamos/> */}
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
