import "./App.css";
import Pajamos from "./Puslapiai/Pajamos/Pajamos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import PajamosSuvesti from "./Puslapiai/Pajamos/PajamosSuvesti";

function App() {
  return (
    <div className="App">
      <Pajamos />
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
      <PajamosSuvesti />
    </div>
  );
}

export default App;
