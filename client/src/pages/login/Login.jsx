import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { loginSchema } from "../../validations/AuthValidations";
import "./login.css";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { updateUser, updateToken } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const formData = new FormData(e.target);
      const { username, password } = Object.fromEntries(formData);

      await loginSchema.validate({ username, password }, { abortEarly: false });

      const res = await apiRequest.post("/login", {
        username,
        password,
      });

      if (res.status === 200) {
        console.log(res.data.user);
        updateUser(res.data.user);
        updateToken(res.data.token);

        navigate("/home");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const yupErrors = [];

        error.inner.forEach((err) => {
          yupErrors.push(err.message);
        });

        setErrors(yupErrors);
      } else {
        setErrors([error.message]);
      }
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">
            Username
            <br />
            <input type="text" name="username" />
          </label>
          <label htmlFor="password">
            Password
            <br />
            <input type="password" name="password" />
          </label>
          <span>
            {errors.map((error, index) => (
              <div className="errorArea" key={index}>
                <span>{error}</span>
                <br />
              </div>
            ))}
          </span>
          <button>Login</button>
        </form>
        <h5>
          {"You haven't an account? "} <a href="/register">Register</a>
        </h5>
      </div>
    </div>
  );
};

export default Login;
