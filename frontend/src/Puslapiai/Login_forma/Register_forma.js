import "./Login_forma_dizainas.css";
import "./Login_forma.js";
import "./Register_forma";
import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";

const Register = (props) => {
  const { setShowLogin } = props;

  const handleSubmit = (e) => {
    e.preventDefault(console.log);
  };

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
      errors.email = "Prašome užpildyti laukelį (El. paštas)";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Prašome užpildyti laukelį (Slaptažodis)";
    }

    return errors;
  };

  //function formValidation() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  console.log("Visited fields", formik.touched);

  //}

  return (
    <div className="forma">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-title">Registracija</h2>

        <div className="row">
          <label htmlFor="name" className="text2">
            Slapyvardis
          </label>

          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Vardenis"
            id="name"
            name="name"
            className={formik.touched.name && formik.errors.name ? "error" : ""}
            
          />
          <div className="form-control2">
            {formik.touched.name && formik.errors.name ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.name} </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="row">
          <label htmlFor="email" className="text2">
            El. paštas
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            type="email"
            placeholder="El. paštas"
            id="email"
            name="email"
            className={
              formik.touched.email && formik.errors.email ? "error" : ""
            }
            
          />
          <div className="form-control2">
            {formik.touched.email && formik.errors.email ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.email} </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="row">
          <label htmlFor="password" className="text2">
            Slaptažodis
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="**********"
            id="password"
            className={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
            name="password"
            
          />
          <div className="form-control2">
            {formik.touched.password && formik.errors.password ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.password} </span>
              </div>
            ) : null}
          </div>
        </div>

        <button className="btn" type="submit" variant="contained">
          Užsiregistruoti
        </button>
      </form>
      <h3 className="textinfo">Jau turite paskyrą ?</h3>

      <button
        onClick={() => setShowLogin(true)}
        className="btn2"
        type="submit"
        variant="contained"
      >
        Prisijungti
      </button>
    </div>
  );
};

export default Register;
