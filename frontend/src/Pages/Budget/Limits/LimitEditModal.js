/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import swal from "sweetalert2";
import axios from "../../../axios";
import { useFormik } from "formik";

export default function LimitEditModal(props) {
  const {modal_limitEdit, setModal_limitEdit, editId, setEditId, getLimits} = props;
  const validate = (values) => {
    let errors = {};

    if (values.limit.length == 0) {
      errors.limit = "Prašome užpildyti laukelį (Limitas)";
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
                  type="text"
                  name="limit"
                  id="limit"
                  placeholder="Limitas"
                  required
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
