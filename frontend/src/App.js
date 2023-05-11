import React, { createContext, useState } from "react";
import {Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { AuthProvider, RequireAuth, RequireAdmin, AuthorizedRedirect } from "./Context/auth";
import Admin from "./Pages/Admin/Admin";
import Budget from "./Pages/Budget/Budget";
import Expense from "./Pages/Expense/Expenses";
import History from "./Pages/History/History";
import Auth from "./Pages/Auth/Auth";
import Navbar from "./Pages/Navbar/Navbar";
import General from "./Pages/General/General";
import Income from "./Pages/Income/Incomes";
import { useAuth } from "./Context/auth";
/*Modals*/
export const ContextProvider = createContext();
function App() {
  const [modal_ExpenseAdd, setModal_ExpenseAdd] = useState(false);
  const [modal_IncomeAdd, setModal_IncomeAdd] = useState(false);
  const auth = useAuth();
  return (
    <div className="App">
      <AuthProvider>
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
              <Route path="*" element={<Navigate to="/" />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <General />
                  </RequireAuth>
                }
              />
               <Route path="/auth" element={<AuthorizedRedirect><Auth /></AuthorizedRedirect>} />
              <Route
                path="/income"
                element={
                  <RequireAuth>
                    <Income />
                  </RequireAuth>
                }
              />
              <Route
                path="/expense"
                element={
                  <RequireAuth>
                    <Expense />
                  </RequireAuth>
                }
              />
              <Route
                path="/budget"
                element={
                  <RequireAuth>
                    <Budget />
                  </RequireAuth>
                }
              />
              <Route path='/Admin' element={<RequireAdmin><Admin /></RequireAdmin>} />
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
      </AuthProvider>
    </div>
  );
}

export default App;
