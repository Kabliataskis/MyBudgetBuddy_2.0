/* eslint-disable linebreak-style */
import React, { useEffect } from "react";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "../../../axios";
import swal from "sweetalert2";
import { useFormik } from "formik";

export default function UserEditModal(props) {
  const { modal_UserEdit, setModal_UserEdit, editId, getUsers } = props;
  const validate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "Prašome užpildyti laukelį (Slapyvardis)";
    } else if (values.username.length < 2) {
      errors.username = "Slapyvardis turi būti min. 2 simbolių!";
    } else if (values.username.length > 15) {
      errors.username = "Slapyvardis turi būti max. 15 simbolių!";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(values.username)) {
      errors.username =
        "Slapyvardis turi būti sudarytas tik iš lotyniškų raidžių ir skaičių!";
    }
    if (!values.email) {
      errors.email = "Prašome užpildyti laukelį (El. paštas)";
    } else if (
      !/^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)*@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9][a-zA-Z0-9\-]*)+$/.test(
        values.email
      )
    ) {
      errors.email = "Neteisingas El. pašto formatas";
    }
    if (!values.password) {
      errors.password = "Prašome užpildyti laukelį (Slaptažodis)";
    } else if (values.password.length < 7) {
      errors.password = "Slaptažodis turi būti min. 7 simbolių!";
    } else if (values.password.length > 50) {
      errors.password = "Slaptažodis turi būti max. 50 simbolių!";
    } else if (!/\d/.test(values.password)) {
      errors.password = "Slaptažodis turi turėti min. 1 skaičių";
    }
    return errors;
  };

  const onSubmit = async (values) => {
    // Užklausa į backend
    try {
      let { username, email, password } = values;
      const res = await axios.patch("/income/" + editId, {
        username,
        email,
        password,
      });
      console.log(res);
      //Jei backend grąžina success
      setModal_UserEdit(false);
      getUsers();
      swal.fire({
        title: "Sėkmingai",
        text: "Įrašas pakeistas",
        icon: "success",
        confirmButtonColor: "#28b78d",
      });
      formik.resetForm();
    } catch (err) {
      console.log(err);
      toast.error("Klaida");
    }
  };

  useEffect(() => {
    const getItem = async () => {
      if (editId) {
        try {
          const res = await axios.get("/auth/" + editId);
          console.log(res.data);
          formik.setFieldValue("username", res.data.username);
          formik.setFieldValue("email", res.data.email);
          formik.setFieldValue("password", "");
        } catch (err) {
          console.log(err);
        }
      }
    };
    getItem();
  }, [editId]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
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
    setModal_UserEdit(false);
    formik.resetForm(); // reset forma
  };

  return (
    <>
      {modal_UserEdit ? (
        <div className="Pajamos-modal-container" onMouseDown={onMouseDown}>
          <div className="modal-content">
            <h2 className="modal-title">Redaguoti vartotoją</h2>
            <span className="modal-close-btn" onClick={() => closeModal()}>
              <AiOutlineClose />
            </span>
            <form
              className="Pajamos-modal-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="username">Slapyvardis</label>
              <p>
                <input
                  className={
                    formik.touched.username && formik.errors.username
                      ? "error"
                      : ""
                  }
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Pavadinimas"
                  maxLength="20"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </p>
              {formik.touched.username && formik.errors.username ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.username}</span>
                </div>
              ) : null}

              <label htmlFor="email">El. paštas</label>
              <p>
                <input
                  className={
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </p>
              {formik.touched.email && formik.errors.email ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.email}</span>
                </div>
              ) : null}

              <label htmlFor="password">Slaptažodis</label>
              <p className="eur">
                <input
                  className={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  onKeyDown={handleKeyDown}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <br />
              </p>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.password}</span>
                </div>
              ) : null}

              <div className="buttons-container">
                <button className="add-btn" type="submit">
                  Pakeisti
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
