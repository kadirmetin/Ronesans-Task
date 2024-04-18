import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import apiRequest from "../../lib/apiRequest";
import { todoSchema } from "../../validations/TodoValidations";
import "./edit.css";

const Edit = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await apiRequest.get(`/todo/getOne/${id}`);

        if (res.status === 200) {
          setText(res.data.todo.text);
          setTime(res.data.todo.time);
          setDisabled(false);
        }
      };

      fetchData();
    } catch (error) {
      console.error(error);

      setErrors([error.message]);
    }
  }, [id]);

  const handleEditTodo = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const formData = new FormData(e.target);
      const { text, time } = Object.fromEntries(formData);

      await todoSchema.validate({ text, time }, { abortEarly: false });

      const res = await apiRequest.put(`/todo/update/${id}`, {
        text,
        time,
      });

      if (res.status === 200) {
        toast.success("Todo updated successfully!");

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
    <div className="edit">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="item">
        <h2>Edit Todo</h2>
        <form onSubmit={handleEditTodo}>
          <label htmlFor="text">
            Text
            <br />
            <input
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <label htmlFor="Time">
            Time
            <br />
            <input
              type="date"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <span>
            {errors.map((error, index) => (
              <div className="errorArea" key={index}>
                <span>{error}</span>
                <br />
              </div>
            ))}
          </span>
          <button disabled={disabled ? true : false}>Update Todo</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
