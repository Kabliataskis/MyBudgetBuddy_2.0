/* eslint-disable linebreak-style */
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiFillWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "../../../axios";
import swal from "sweetalert2";
import { useFormik } from "formik";

export default function UserCreateModal(props) {
  const { modal_UserCreate, setModal_UserCreate, getUsers } = props;
  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Prašome užpildyti laukelį (Slapyvardis)";
    } else if (values.username.length < 2) {
      errors.username = "Slapyvardis turi būti min. 2 simbolių!";
    } else if (values.username.length > 15) {
      errors.username = "Slapyvardis turi būti max. 15 simbolių!";
    } else if (!/^[a-zA-Z0-9 ]+$/.test(values.username)) {
      errors.username = "Slapyvardis turi būti sudarytas tik iš lotyniškų raidžių ir skaičių!";
    }
    if (!values.email) {
      errors.email = "Prašome užpildyti laukelį (El. paštas)";
    } else if (
      !/^[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+(?:\.[a-zA-Z0-9!#$%&'*+\-\/=?^_`{|}~]+)*@[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9][a-zA-Z0-9\-]*)+$/.test(values.email)
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
    if (!values.password_repeat) {
      errors.password_repeat =
        "Prašome užpildyti laukelį (Patvirtinti naują slaptažodį)";
    } else if (values.password_repeat != values.password) {
      errors.password_repeat = "Slaptažodžiai nesutampa";
    }

    return errors;
  };


  const onSubmit = async (values) => {
    try {
      let { username, email, password, password_repeat } = values;
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        password_repeat
      });
      getUsers();
      setModal_UserCreate(false);
      formik.resetForm();
      swal.fire({
        title: "Sėkmingai",
        text: "Vartotojas sėkmingai sukurtas",
        icon: "success",
        confirmButtonColor: "#28b78d",
      });
    } catch (err) {
      toast.error(err.response.data.mess);
    }
  };


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_repeat: "",
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
    setModal_UserCreate(false);
    formik.resetForm(); // reset forma
  };

  return (
    <>
      {modal_UserCreate ? (
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
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Slapyvardis"
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
                  placeholder="El.Paštas"
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
              <p>
                <input
                  className={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Slaptažodis"
                  autoComplete="off"
                  required
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

            <label htmlFor="password_repeat">Patvirtinti naują slaptažodį</label>
              <p>
                <input
                  className={
                    formik.touched.password_repeat && formik.errors.password_repeat
                      ? "error"
                      : ""
                  }
                  type="password"
                  name="password_repeat"
                  id="password_repeat"
                  placeholder="Patvirtinti naują slaptažodį"
                  autoComplete="off"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_repeat}
                />
                <br />
              </p>
              {formik.touched.password_repeat && formik.errors.password_repeat ? (
                <div className="error-mess-box">
                  <AiFillWarning className="error-mess-icon" />
                  <span>{formik.errors.password_repeat}</span>
                </div>
              ) : null}

              <div className="buttons-container">
                <button className="add-btn" type="submit">
                  Sukurti
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
