import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
