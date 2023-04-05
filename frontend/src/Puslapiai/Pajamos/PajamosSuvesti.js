/* eslint-disable linebreak-style */
import React, { useState, useContext } from "react";
import { ContextProvider } from "../../App";
import { toast } from "react-toastify";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import "./Pajamos_dizainas.css";
import swal from 'sweetalert2'
import {useFormik} from 'formik'

function PajamosSuvesti(props) {
  const { modal_PajamosSuvesti, setModal_PajamosSuvesti } = useContext(ContextProvider);
  const max_amount = 9999999; // Maksimali suma €
  

  const validate = (values) => {
    let selected_time = new Date(values.date).getTime();
    let curr_time = new Date().getTime();
    let errors = {};

    if(!values.title) {
      errors.title = 'Prašome užpildyti laukelį (Pavadinimas)';
    }else if (values.title.length > 20) {
      errors.title = 'Pavadinimo ilgis iki 20 simbolių!';
    } 

    if(!values.date){
      errors.date = 'Prašome užpildyti laukelį (Data)';
    }else if (selected_time > curr_time) {
      errors.date = 'Data negali būti vėlesnė nei ši diena';
    }

    if(!values.amount){
      errors.amount = 'Prašome užpildyti laukelį (Suma)';
    }else if(values.amount <= 0){
      errors.amount = 'Minimali suma 0.01 €';
    }else if (values.amount > max_amount) {
      errors.amount = `Suma negali viršyti ${max_amount} €`;
    }else if(values.amount && !/^\d+(\.\d{1,2})?$/.test(values.amount)){
      errors.amount = 'Neteisingas formatas. Pvz: 10.21€'; 
    }
    return errors;
  }
 
  const onSubmit = (values) => {
        // Užklausa į backend

        // Jei backend grąžina success
        setModal_PajamosSuvesti(false);
        swal.fire({
          title: 'Sėkmingai',
          text: 'Įrašas pridėtas',
          icon: 'success',
          confirmButtonColor: '#28b78d',
       });
       formik.resetForm();
}

  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
      amount: '',
    },
    onSubmit,
    validate
  });
  console.log(formik.values);

  // Modal close on background click
  const onMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close
  const closeModal = () => {
    setModal_PajamosSuvesti(false);
    //formik.resetForm(); // reset forma
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
            <form className="Pajamos-modal-form" noValidate onSubmit={formik.handleSubmit}>
              <label htmlFor="title">Pavadinimas</label>
              <p>
                <input
                  className={formik.touched.title && formik.errors.title ? 'error' : ''}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Pavadinimas"
                  maxLength="20"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </p>
              {formik.touched.title && formik.errors.title ? <div className="error-mess-box"><AiFillWarning className="error-mess-icon"/> <span>{formik.errors.title}</span></div> : null}


              <label htmlFor="date">Data</label>
              <p>
                <input
                  className={formik.touched.date && formik.errors.date ? 'error' : ''}
                  type="date"
                  name="date"
                  id="date"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
              </p>
              {formik.touched.date && formik.errors.date ? <div className="error-mess-box"><AiFillWarning className="error-mess-icon"/> <span>{formik.errors.date}</span></div> : null}

              <label htmlFor="title">Suma</label>
              <p className="eur">
                <input
                  className={formik.touched.amount && formik.errors.amount ? 'error' : ''}
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Suma"
                  min="0.01"
                  max={max_amount}
                  step="0.01"
                  autoComplete="off"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                />
                <br/>
              </p>
              {formik.touched.amount && formik.errors.amount ? <div className="error-mess-box"><AiFillWarning className="error-mess-icon"/> <span>{formik.errors.amount}</span></div> : null}

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
