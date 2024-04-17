import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import apiRequest from "../../lib/apiRequest";
import { registerSchema } from "../../validations/AuthValidations";
import "./register.css";

const Register = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const formData = new FormData(e.target);
      const { username, password, confirmPassword } =
        Object.fromEntries(formData);

      await registerSchema.validate(
        { username, password, confirmPassword },
        { abortEarly: false }
      );

      const res = await apiRequest.post("/register", {
        username,
        password,
      });

      if (res.status === 201) {
        navigate("/");
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
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
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
          <label htmlFor="confirmPassword">
            Confirm Password
            <br />
            <input type="password" name="confirmPassword" />
          </label>
          <span>
            {errors.map((error, index) => (
              <div className="errorArea" key={index}>
                <span>{error}</span>
                <br />
              </div>
            ))}
          </span>
          <button>Register</button>
        </form>
        <h5>
          {"Are you have an account? "} <a href="/">Login</a>
        </h5>
      </div>
    </div>
  );
};

export default Register;
