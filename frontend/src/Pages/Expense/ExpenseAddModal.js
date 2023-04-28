import React, { useContext } from "react";
import { ContextProvider } from "../../App";
import axios from "../../axios";
import { toast } from "react-toastify";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import swal from "sweetalert2";
import { useFormik } from "formik";
import "./Expense.css";
export default function ExpenseAddModal(props) {
  const { modal_ExpenseAdd, setModal_ExpenseAdd } = useContext(ContextProvider);
  const max_sum = 9999999; // Maksimali suma €

  const validate = (values) => {
    let selected_time = new Date(values.date).getTime();
    let curr_time = new Date().getTime();
    let errors = {};

    if (!values.category) {
      errors.category = "Prašome pasirinkti kategoriją";
    }

    if (!values.title) {
      errors.title = "Prašome užpildyti laukelį (Pavadinimas)";
    } else if (values.title.length > 20) {
      errors.title = "Pavadinimo ilgis iki 20 simbolių!";
    }

    if (!values.date) {
      errors.date = "Prašome užpildyti laukelį (Data)";
    } else if (selected_time > curr_time) {
      errors.date = "Data negali būti vėlesnė nei ši diena";
    }

    if (!values.sum) {
      errors.sum = "Prašome užpildyti laukelį (Suma)";
    } else if (values.sum <= 0) {
      errors.sum = "Minimali suma 0.01 €";
    } else if (values.sum > max_sum) {
      errors.sum = `Suma negali viršyti ${max_sum} €`;
    } else if (values.sum && !/^\d+(\.\d{1,2})?$/.test(values.sum)) {
      errors.sum = "Neteisingas formatas. Pvz: 10.21€";
    }
    return errors;
  };
  const onSubmit = async (values) => {
    try {
      let { category, title, date, sum } = values;
      const res = await axios.post("/expense", {
        category,
        title,
        date,
        sum,
      });
      console.log(res);
      //Jei backend grąžina success
      setModal_ExpenseAdd(false);
      swal.fire({
        title: "Sėkmingai",
        text: res.data.mess,
        icon: "success",
        confirmButtonColor: "#28b78d",
      });
      formik.resetForm();
    } catch (err) {
      console.log(err);
      toast.error("Klaida");
    }
  };

  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      date: "",
      sum: "",
    },
    validate,
    onSubmit,
  });
  const handleKeyDown = (event) => {
    if (
      !(
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "Backspace" ||
        event.key === "Delete" ||
        (event.key === "a" && event.ctrlKey === true) ||
        (event.key === "c" && event.ctrlKey === true) ||
        (event.key === "v" && event.ctrlKey === true) ||
        (event.key === "x" && event.ctrlKey === true) ||
        /^[0-9.,]+$/.test(event.key)
      )
    ) {
      event.preventDefault();
    }
  };

  // Modal close on background click
  const onMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close
  const closeModal = () => {
    setModal_ExpenseAdd(false);
  };

  return (
    <>
      {modal_ExpenseAdd ? (
        <div
          className="Pajamos-modal-container ExpenseModal"
          onMouseDown={onMouseDown}
        >
          <div className="modal-content">
            <h2 className="modal-title">Pridėti išlaidas</h2>
            <span className="modal-close-btn" onClick={() => closeModal()}>
              <AiOutlineClose />
            </span>
            <form
              className="Pajamos-modal-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <select
                className="boxOptions"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                <option className="category" value="">
                  Pasirinkite kategoriją
                </option>
                <option value="Transportas">Transportas</option>
                <option value="Maistas">Maistas</option>
                <option value="Mokesčiai">Mokesčiai</option>
                <option value="Laisvalaikis">Laisvalaikis</option>
                <option value="Parduotuvė">Parduotuvė</option>
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.category}</span>
                </div>
              ) : null}
              <label htmlFor="title">Pavadinimas</label>
              <p>
                <input
                  className={
                    formik.touched.title && formik.errors.title ? "error" : ""
                  }
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
              {formik.touched.title && formik.errors.title ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.title}</span>
                </div>
              ) : null}

              <label htmlFor="date">Data</label>
              <p>
                <input
                  className={
                    formik.touched.date && formik.errors.date ? "error" : ""
                  }
                  type="date"
                  name="date"
                  id="date"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
              </p>
              {formik.touched.date && formik.errors.date ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.date}</span>
                </div>
              ) : null}

              <label htmlFor="title">Suma</label>
              <p className="eur">
                <input
                  className={
                    formik.touched.sum && formik.errors.sum ? "error" : ""
                  }
                  type="number"
                  name="sum"
                  id="sum"
                  placeholder="Suma"
                  min="0.01"
                  max={max_sum}
                  step="0.01"
                  autoComplete="off"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sum}
                />
                <br />
              </p>
              {formik.touched.sum && formik.errors.sum ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.sum}</span>
                </div>
              ) : null}

              <div className="buttons-container">
                <button className="add-btn" type="submit">
                  Pridėti
                </button>
                <button
                  className="cancel-btn"
                  type="reset"
                  onClick={() => {
                    closeModal();
                    formik.resetForm();
                  }}
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
