import React, {useContext } from "react";
import axios from "../../../axios";
import { toast } from "react-toastify";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import swal from "sweetalert2";
import { useFormik } from "formik";

export default function CategoryCreate_Modal(props) {
  const {getCategories} = props;
  const { modal_categoryCreate, setModal_categoryCreate } = props;

  const validate = (values) => {
    let errors = {};

    if (!values.title) {
      errors.title = "Prašome užpildyti laukelį (Pavadinimas)";
    } else if (values.title.length > 20) {
      errors.title = "Pavadinimo ilgis iki 20 simbolių!";
    }

    // if (!values.imgSrc) {
    //   errors.imgSrc = "Prašome užpildyti laukelį (Paveikslėlio nuoroda)";
    // } 
    return errors;
  };

  const onSubmit = async (values) => {
    console.log("submit");
    try{
      let {title, imgSrc} = values;
      const res = await axios.post("/category/", {
        title, imgSrc
      });
      console.log(res);
      //Jei backend grąžina success
      setModal_categoryCreate(false);
      swal.fire({
        title: "Sėkmingai",
        text: "Kategorija sukurta",
        icon: "success",
        confirmButtonColor: "#28b78d",
      });
      formik.resetForm();
      getCategories();
    } catch (err){
      console.log(err);
      toast.error(`Klaida. ${err.response.data.msg}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      imgSrc: "favicon.ico",
    },
    validate,
    onSubmit,

  });

  // Modal close on background click
  const onMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  // Modal close
  const closeModal = () => {
    setModal_categoryCreate(false);
  };

  return (
    <>
      {modal_categoryCreate ? (
        <div className="Pajamos-modal-container" onMouseDown={onMouseDown}>
          <div className="modal-content">
            <h2 className="modal-title">Sukurti kategoriją</h2>
            <span className="modal-close-btn" onClick={() => closeModal()}>
              <AiOutlineClose />
            </span>
            <form
              className="Pajamos-modal-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
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


            <label htmlFor="imgSrc">Paveikslėlio nuoroda</label>
              <p>
                <input
                  className={
                    formik.touched.imgSrc && formik.errors.imgSrc ? "error" : ""
                  }
                  type="text"
                  name="imgSrc"
                  id="imgSrc"
                  placeholder="Paveikslėlio nuoroda"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.imgSrc}
                />
              </p>
              {formik.touched.imgSrc && formik.errors.imgSrc ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.imgSrc}</span>
                </div>
              ) : null}
              <img className="CategoryModal-img" src={formik.values.imgSrc} alt="kategorijos_paveikslėlis"/>

              <div className="buttons-container">
                <button className="add-btn" type="submit">
                  Sukurti
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

