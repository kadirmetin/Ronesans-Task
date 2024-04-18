import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import RoutesList from "./routes";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <ModalProvider>
          <RoutesList />
        </ModalProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
