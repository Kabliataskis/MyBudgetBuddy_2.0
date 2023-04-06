import "./Login_forma_dizainas.css";
import "./Login_forma.js";
import "./Register_forma";
import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";

export const Login = (props) => {
  const { setShowLogin } = props;

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Prašome užpildyti laukelį (Slapyvardis)";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.text(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Prašome užpildyti laukelį (Slaptažodis)";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="forma">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-title">Prisijungimas</h2>
        <div className="row">
          <label htmlFor="name" className="text2">
            Slapyvardis
          </label>
          <input
            className={formik.touched.name && formik.errors.name ? "error" : ""}
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            type="name"
            placeholder="Vardenis"
            id="name"
            name="name"
            required
          />
          <div className="form-control">
            {formik.touched.name && formik.errors.name ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.name} </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="row">
          <label htmlFor="password" className="text2">
            Slaptažodis
          </label>
          <input
            className={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="**********"
            id="password"
            name="password"
            required
          />
          <div className="form-control">
            {formik.touched.password && formik.errors.password ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.password} </span>
              </div>
            ) : null}
          </div>
        </div>

        <button
          className="btn"
          type="submit"
          variant="contained"
          onClick={() => Login}
        >
          Prisijungti
        </button>
      </form>

      <h3 className="textinfo">Dar neturite paskyros ?</h3>

      <button
        className="btn2"
        onClick={() => setShowLogin(false)}
        type="submit"
        variant="contained"
      >
        Registracija
      </button>
    </div>
  );
};

export default Login;
