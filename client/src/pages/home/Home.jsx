import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { currentUser, token } = useContext(AuthContext);

  return (
    <div className="home">
      {currentUser ? currentUser.username : "yok"} <br />
      {token ? token : "yok"}
    </div>
  );
};

export default Home;
