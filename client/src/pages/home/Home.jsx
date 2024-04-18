import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Todo from "../../components/todo/Todo";
import apiRequest from "../../lib/apiRequest";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/todo/getAll");

        if (res) {
          setTodos(res.data.todos);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="menu">
        <h3>TODO APP</h3>
        <button>Pick to Around</button>
        <button>Download PDF</button>
        <button onClick={() => navigate("/create")}>Create Todo</button>
      </div>
      <div className="main">
        {todos.length === 0 ? (
          <div className="error">
            <p>Henüz bir todo eklenmemiş!</p>
          </div>
        ) : (
          todos.map((todo, index) => (
            <Todo
              key={index}
              todo_id={todo.todo_id}
              text={todo.text}
              time={todo.time}
              initialChecked={todo.checked}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
