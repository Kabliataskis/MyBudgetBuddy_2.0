import Pajamos from "./Puslapiai/Pajamos/Pajamos";
import Navbar from './Puslapiai/Navbar/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import "./index.css";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";
import Pirmas_puslapis from "./Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis";
import Auth from "./Puslapiai/Login_forma/Auth";
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Pirmas_puslapis />} />
          <Route path='/auth' element={<Auth/>} />
          <Route path='/pajamos' element={<Pajamos />} />
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

    </div>
  );
}

export default App;
