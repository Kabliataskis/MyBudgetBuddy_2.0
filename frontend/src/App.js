import "./App.css";
import Pajamos from "./Puslapiai/Pajamos/Pajamos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";
import Pirmas_puslapis from "./Puslapiai/Pagrindinis_puslapis/Pagrindinis_puslapis";
function App() {
  return (
    <div className="App">
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
      <Pirmas_puslapis />
    </div>
  );
}

export default App;
