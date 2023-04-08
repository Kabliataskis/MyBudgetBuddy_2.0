import React, {useState,/* useContext,*/ createContext } from 'react';
import Navbar from './Puslapiai/Navbar/Navbar';
import Pajamos from './Puslapiai/Pajamos/Pajamos';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import "./index.css";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";
export const ContextProvider = createContext();
function App() {
  const [modal_PajamosSuvesti, setModal_PajamosSuvesti] = useState(false);
  return (
    <div className="App">
      <ContextProvider.Provider value={{ modal_PajamosSuvesti, setModal_PajamosSuvesti}}>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' />
          <Route path='/pajamos' element={<><Pajamos/> <PajamosSuvesti/> </>}/>
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
