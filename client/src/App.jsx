import { AuthContextProvider } from "./context/AuthContext";
import RoutesList from "./routes";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <RoutesList />
      </AuthContextProvider>
    </>
  );
};

export default App;
