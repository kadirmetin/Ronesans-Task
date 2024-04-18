import { PDFDownloadLink } from "@react-pdf/renderer";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyDoc from "../../components/PdfDocument/PdfDocument";
import Todo from "../../components/todo/Todo";
import { ModalContext } from "../../context/ModalContext";
import apiRequest from "../../lib/apiRequest";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const { openModal, filterStartTime, filterEndTime } =
    useContext(ModalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest.get("/todo/getAll");

        if (res.status === 200 && res.data.todos) {
          setTodos(res.data.todos);
          setFilteredTodos(res.data.todos);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) => {
        if (!filterStartTime && !filterEndTime) {
          return true; // Filtre yoksa, tüm todoları tut
        } else if (filterStartTime && filterEndTime) {
          return todo.time >= filterStartTime && todo.time <= filterEndTime; // Hem startTime hem de endTime belirtilmişse, zaman aralığına göre filtrele
        } else if (filterStartTime) {
          return todo.time >= filterStartTime; // Sadece startTime belirtilmişse, startTime'dan sonra olanları tut
        } else if (filterEndTime) {
          return todo.time <= filterStartTime; // Sadece endTime belirtilmişse, endTime'den önce olanları tut
        }

        return true; // Diğer durumlarda tüm todoları tut
      })
    );
  }, [todos, filterStartTime, filterEndTime]);

  return (
    <div className="home">
      <div className="menu">
        <h3>TODO APP</h3>

        <button onClick={() => openModal()}>Pick to Around</button>

        <PDFDownloadLink
          document={<MyDoc todos={filteredTodos} />}
          fileName="somename.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>

        <button onClick={() => navigate("/create")}>Create Todo</button>
      </div>
      <div className="main">
        {filteredTodos.length === 0 ? (
          <div className="error">
            <p>Henüz bir todo eklenmemiş!</p>
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
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
