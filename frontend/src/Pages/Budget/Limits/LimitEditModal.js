/* eslint-disable linebreak-style */
import React, { useEffect } from "react";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import axios from "../../../axios";
import { useFormik } from "formik";

export default function LimitEditModal(props) {
  const {modal_limitEdit, setModal_limitEdit, editId, setEditId, getLimits} = props;
  const max_amount = 9999999; // Maksimali suma €
  const validate = (values) => {
    let errors = {};

    if (values.limit.length == 0) {
      errors.limit = "Prašome užpildyti laukelį (Limitas)!";
    }else if(values.limit > max_amount){
      errors.limit = `Limitas negali būti didesnis už ${max_amount}€!`;
    }else if(values.limit < 0){
      errors.limit = "Limitas turi būti didesnis arba lygus nuliui!";
    }else if (values.limit && !/^\d+(\.\d{1,2})?$/.test(values.limit)) {
      errors.limit = "Neteisingas formatas. Pvz: 10.21€";
    } else if (!Number(values.limit)) {
      errors.limit = "Limitas turi būti skaičius!";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    try{
      let {limit} = values;
      const res = await axios.patch("/limits/"+editId, {limit});
      getLimits();
      setModal_limitEdit(false);
      swal.fire({
        title: "Sėkmingai",
        text: "Limitas atnaujintas",
        icon: "success",
        confirmButtonColor: "#28b78d",
      });
    } catch (err){
      console.log(err);
      toast.error(`Klaida. ${err.response.data.msg}`);
    }
  };


  useEffect(() => {
    const getLimit = async () => {
      if(editId){
        try {
          const res = await axios.get("/limits/"+editId);
          formik.setFieldValue("category", res.data.category.title);
          formik.setFieldValue("limit", res.data.limit);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getLimit();
  }, [editId]);


  const formik = useFormik({  
    initialValues: {
      category: "",
      limit: "",
    },
    onSubmit,
    validate,
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
    setModal_limitEdit(false);
    setEditId();
    //formik.resetForm(); // reset forma
  };

  return (
    <>
      {modal_limitEdit ? (
        <div className="Pajamos-modal-container" onMouseDown={onMouseDown}>
          <div className="modal-content">
            <h2 className="modal-title">Limito nustatymas</h2>
            <span className="modal-close-btn" onClick={() => closeModal()}>
              <AiOutlineClose />
            </span>
            <form
              className="Pajamos-modal-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="category">Kategorija</label>
              <p>
                <input
                  className={
                    formik.touched.category && formik.errors.category ? "error" : ""
                  }
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Kategorija"
                  maxLength="20"
                  required
                  disabled
                  onChange={formik.handleChange}
                  value={formik.values.category}
                />
              </p>
              {formik.touched.category && formik.errors.category ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.category}</span>
                </div>
              ) : null}


            <label htmlFor="limit">Limitas</label>
              <p>
                <input
                  className={
                    formik.touched.limit && formik.errors.limit ? "error" : ""
                  }
                  type="number"
                  name="limit"
                  id="limit"
                  min="0.01"
                  max={max_amount}
                  autoComplete="off"
                  step="0.01"
                  placeholder="Limitas"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.limit}
                />
              </p>
              {formik.touched.limit && formik.errors.limit ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.limit}</span>
                </div>
              ) : null}

              <div className="buttons-container">
                <button className="add-btn" type="submit">
                  Nustatyti
                </button>
                <button
                  className="cancel-btn"
                  type="reset"
                  onClick={() => {
                    closeModal();
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
