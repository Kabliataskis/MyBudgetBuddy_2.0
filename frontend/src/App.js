import Navbar from './Puslapiai/Navbar/Navbar';
import Pajamos from './Puslapiai/Pajamos/Pajamos';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './Puslapiai/Login_forma/Auth';
import "./index.css";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<PajamosSuvesti />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/pajamos' element={<Pajamos />} />
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
      {/* <PajamosSuvesti /> */}
    </div>
  );
}

export default App;
