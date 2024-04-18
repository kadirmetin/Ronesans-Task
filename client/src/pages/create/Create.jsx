import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import apiRequest from "../../lib/apiRequest";
import { todoSchema } from "../../validations/TodoValidations";
import "./create.css";

const Create = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleTodo = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const formData = new FormData(e.target);
      const { text, time } = Object.fromEntries(formData);

      await todoSchema.validate({ text, time }, { abortEarly: false });

      const res = await apiRequest.post("/todo/create", {
        text,
        time,
      });

      if (res.status === 201) {
        toast.success("Todo added successfully!");

        navigate("/home");

        e.target.reset();
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
    <div className="create">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="item">
        <h2>Create Todo</h2>
        <form onSubmit={handleTodo}>
          <label htmlFor="text">
            Text
            <br />
            <input type="text" name="text" />
          </label>
          <label htmlFor="Time">
            Time
            <br />
            <input type="date" name="time" />
          </label>
          <span>
            {errors.map((error, index) => (
              <div className="errorArea" key={index}>
                <span>{error}</span>
                <br />
              </div>
            ))}
          </span>
          <button>Create Todo</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
