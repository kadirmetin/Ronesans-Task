import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import "./header.css";

const Header = () => {
  const { currentUser, updateUser, token, updateToken } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      updateUser(null);
      updateToken(null);

      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="header">
      <h3>
        {token ? (
          <span>
            Hello, <span className="username">{currentUser.username}</span>
          </span>
        ) : (
          "Ronesans Task"
        )}
      </h3>
      {token && <img src="/exit.png" alt="" onClick={handleLogout} />}
    </header>
  );
};

export default Header;
