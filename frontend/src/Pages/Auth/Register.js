import { useFormik } from "formik";
import { AiFillWarning } from "react-icons/ai";
import { useAuth } from "../../Context/auth";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const Register = (props) => {
  const { setShowLogin } = props;
  const navigate = useNavigate();
  const auth = useAuth();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_repeat: "",
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
      formik.resetForm();
      auth.login(res.data.data);
      toast.success("Paskyra sėkmingai sukurta");
      navigate('/', {replace: true});
    } catch (err) {
      toast.error(err.response.data.mess);
    }
  };

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
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="forma">
      <form noValidate onSubmit={formik.handleSubmit}>
        <h2 className="form-title">Registracija</h2>

        <div className="row">
          <label htmlFor="name" className="text2">
            Slapyvardis
          </label>

          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Vardenis"
            id="username"
            name="username"
            className={formik.touched.username && formik.errors.username ? "error" : ""}
          />
          <div className="form-control2">
            {formik.touched.username && formik.errors.username ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.username} </span>
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
            name="password"
            className={
              formik.touched.password && formik.errors.password ? "error" : ""
            }
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

        <div className="row">
          <label htmlFor="password_repeat" className="text2">
            Patvirtinti naują slatažodį
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password_repeat}
            onBlur={formik.handleBlur}
            type="password"
            placeholder="**********"
            id="password_repeat"
            name="password_repeat"
            className={
              formik.touched.password_repeat && formik.errors.password_repeat
                ? "error"
                : ""
            }
          />
          <div className="form-control2">
            {formik.touched.password_repeat && formik.errors.password_repeat ? (
              <div className="error">
                <AiFillWarning className="error-mess-icon" />
                <span>{formik.errors.password_repeat} </span>
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
