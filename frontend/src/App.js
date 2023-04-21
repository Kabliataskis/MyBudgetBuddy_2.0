import React, { useState,  createContext } from "react";
import Navbar from "./Puslapiai/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './Puslapiai/Login_forma/Auth';
import "./index.css";
import Pajamos from "./Puslapiai/Pajamos/Pajamos";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";
import Pirmas_puslapis from "./Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis";
import Islaidos from "./Puslapiai/Islaidos/Islaidos";
import Biudzetas from "./Puslapiai/Biudzetas/Biudzietas";
import Istorija from "./Puslapiai/Istorija/Istorija";
/*Modals*/
import ExpenseModal from "./Puslapiai/Islaidos/ExpenseModal";
export const ContextProvider = createContext();
function App() {
  const [modal_ExpenseModal, setModal_ExpenseModal] = useState(false);
  const [modal_PajamosSuvesti, setModal_PajamosSuvesti] = useState(false);
  return (
    <div className="App">
      <ContextProvider.Provider value={{ modal_PajamosSuvesti, setModal_PajamosSuvesti, modal_ExpenseModal, setModal_ExpenseModal }}>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<><Pirmas_puslapis/> <PajamosSuvesti/> <ExpenseModal/></>} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/pajamos' element={<><Pajamos/> <PajamosSuvesti/></>}/>
          <Route path='/islaidos' element={<><Islaidos /> <ExpenseModal/></>} />
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
