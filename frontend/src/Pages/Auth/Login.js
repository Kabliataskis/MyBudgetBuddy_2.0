import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";
import { useAuth } from "../../Context/auth";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
  const { setShowLogin } = props;
  const navigate = useNavigate();
  const auth = useAuth();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      let { username, password } = values;
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      formik.resetForm();
      auth.login(res.data.data.token);
      navigate('/', {replace: true});
    } catch (err) {
      toast.error(err.response.data.mess);
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Prašome užpildyti laukelį (Slapyvardis)";
    }
    if (!values.email) {
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.text(values.email)
    ) {
      errors.email = "Neteisingas El. pašto formatas";
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
          <label htmlFor="username" className="text2">
            Slapyvardis
          </label>
          <input
            className={
              formik.touched.username && formik.errors.username ? "error" : ""
            }
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Vardenis"
            id="username"
            name="username"
          />
          <div className="form-control">
            {formik.touched.username && formik.errors.username ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.username} </span>
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
