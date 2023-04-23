import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Budget from "./Pages/Budget/Budget";
import Expense from "./Pages/Expense/Expenses";
import History from "./Pages/History/History";
import Auth from "./Pages/Auth/Auth";
import Navbar from "./Pages/Navbar/Navbar";
import General from "./Pages/General/General";
import Income from "./Pages/Income/Incomes";
/*Modals*/
import ExpenseAddModal from "./Pages/Expense/ExpenseAddModal";
import IncomeAddModal from "./Pages/Income/IncomeAddModal";
export const ContextProvider = createContext();
function App() {
  const [modal_ExpenseAdd, setModal_ExpenseAdd] = useState(false);
  const [modal_IncomeAdd, setModal_IncomeAdd] = useState(false);
  return (
    <div className="App">
      <ContextProvider.Provider
        value={{
          modal_IncomeAdd,
          setModal_IncomeAdd,
          modal_ExpenseAdd,
          setModal_ExpenseAdd,
        }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <General /> <IncomeAddModal /> <ExpenseAddModal />
                </>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/income"
              element={
                <>
                  <Income /> <IncomeAddModal />
                </>
              }
            />
            <Route
              path="/expense"
              element={
                <>
                  <Expense /> <ExpenseAddModal />
                </>
              }
            />
            <Route path="/budget" element={<Budget />} />
            {/* <Route path='/admin' element={<Admin />} /> */}
            <Route path="/history" element={<History />} />
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
