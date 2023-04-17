import { useState } from "react";
import './AddExpenseForm.css';

function ExpenseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [expense, setExpense] = useState({
    description: "",
    date: "",
    amount: "",
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setExpense({ description: "" ,date: "", amount: ""  });
    setIsOpen(false);
  };



  return (
    <>
      <button className="btnAdd" onClick={() => setIsOpen(true)}>Įvesti išlaidas</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>
              &times;
            </span>
            <form class onSubmit={handleSubmit}>
              <h2>Pridėti išlaidas</h2>
            
              <select className="boxOptions" id="options" value={selectedOption} onChange={handleOptionChange}>
               
                <option className="category"  value="">Pasirinkite kategoriją</option>
                <option value="Transportas">Transportas</option>
                <option  value="Maistas">Maistas</option>
                <option  value="Mokesčiai">Mokesčiai</option>
                <option value="Laisvalaikis">Laisvalaikis</option>
                <option  value="Parduotuvė">Parduotuvė</option>
              </select>
              <label  htmlFor="description">Pavadinimas</label>
              <input
              className="inputs"
                type="text"
                id="description"
                name="description"
                value={expense.description}
                onChange={handleInputChange}
              />
              <label htmlFor="date">Data</label>
              <input
              className="inputs"
                type="date"
                id="date"
                name="date"
                value={expense.amount}
                onChange={handleInputChange}
              />
              <label htmlFor="amount">Suma</label>
              <input
              className="inputs"
                type="number"
                id="amount"
                name="amount"
                value={expense.date}
                onChange={handleInputChange}
              />
              <div className="button-container">
                <button className="Pridėti"type="submit">Pridėti</button>
                <button className="Atsaukti" type="button" onClick={() => setIsOpen(false)}>
                  Atšaukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ExpenseModal;