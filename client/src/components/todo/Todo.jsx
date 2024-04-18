import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiRequest from "../../lib/apiRequest";
import "./todo.css";

const Todo = ({ todo_id, time, text, initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked);

  const navigate = useNavigate();

  const handleCheckboxChange = async () => {
    try {
      const res = await apiRequest.put(`/todo/update/${todo_id}`, {
        checked: !checked,
      });

      if (res.status === 200) {
        toast.success("Checked marking process successful");
        setChecked(!checked);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (todo_id) => {
    try {
      const res = await apiRequest.delete(`/todo/delete/${todo_id}`);

      if (res.status === 200) {
        navigate(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="todo">
      <div className="left">
        <input
          type="checkbox"
          name="checked"
          id="checked"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <div className="textArea">
          <p className={`text ${checked ? "checked" : ""}`}>{text}</p>
          <p className={`time ${checked ? "checked" : ""}`}>{time}</p>
        </div>
      </div>
      <div className="right">
        <img
          src="./pen.png"
          alt=""
          onClick={() => navigate(`/edit/${todo_id}`)}
        />
        <img src="./delete.png" alt="" onClick={() => handleDelete(todo_id)} />
      </div>
    </div>
  );
};

export default Todo;
