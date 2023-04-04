/* eslint-disable linebreak-style */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import "./Pajamos_dizainas.css";
import swal from 'sweetalert2'

function PajamosSuvesti() {
  const max_amount = 9999999; // Maksimali suma €
  const [modal_PajamosSuvesti, setModal_PajamosSuvesti] = useState(false);

  const defaultInputValues = {
    title: "",
    date: "",
    amount: "",
  };
  const [formInputs, setFormInputs] = useState(defaultInputValues);
  const { title, date, amount } = formInputs;

  // Modal close on background click
  const onMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close and clear input's
  const closeModal = () => {
    setModal_PajamosSuvesti(false);
    setFormInputs(defaultInputValues);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setFormInputs({ ...formInputs, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && date && amount) {
      let selected_time = new Date(date).getTime();
      let curr_time = new Date().getTime();

      if (title.length > 20) {
        toast.error("Pavadinimo ilgis iki 20 simbolių!");
      } else if (selected_time > curr_time) {
        toast.error("Data negali būti didesnė už dabartinį laiką");
      } else if (amount > max_amount) {
        toast.error(`Suma negali viršyti ${max_amount} €`);
      } else {
        // Frontend validation success
        // Request to backend
        setModal_PajamosSuvesti(false);
        // swal.fire(
				//   'Sėkmingai!',
				//   'Įrašas pridėtas',
				//   'success'
				// )
        swal.fire({
          title: 'Sėkmingai',
          text: 'Įrašas pridėtas',
          icon: 'success',
          confirmButtonColor: '#28b78d',

        })
        setFormInputs(defaultInputValues);
      }
    } else {
      toast.error("Užpildykite visus laukelius!");
    }
  };
  return (
    <>
      <button onClick={() => setModal_PajamosSuvesti(true)}>
        Pridėti pajamas
      </button>
      {modal_PajamosSuvesti ? (
        <div className="Pajamos-modal-container" onMouseDown={onMouseDown}>
          <div className="modal-content">
            <h2 className="modal-title">Pridėti pajamas</h2>
            <span className="modal-close-btn" onClick={() => closeModal()}>
              <AiOutlineClose />
            </span>
            <form className="Pajamos-modal-form" onSubmit={handleSubmit}>
              <label htmlFor="title">Pavadinimas</label>
              <p>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Pavadinimas"
                  maxLength="20"
                  required
                  onChange={handleChange}
                  value={title}
                />
              </p>

              <label htmlFor="date">Data</label>
              <p>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  onChange={handleChange}
                  value={date}
                />
              </p>

              <label htmlFor="title">Suma</label>
              <p className="eur">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Suma"
                  min="0.01"
                  max={max_amount}
                  step="0.01"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  value={amount}
                />
              </p>
              <div className="buttons-container">
                <button className="add-btn" type="submit">
                  Pridėti
                </button>
                <button
                  className="cancel-btn"
                  type="reset"
                  onClick={() => closeModal()}
                >
                  Atšaukti
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PajamosSuvesti;
