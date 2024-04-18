import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Create from "../pages/create/Create";
import Edit from "../pages/edit/Edit";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { LoginandRegisterProtect, ProtectedRoute } from "./ProtectedRoute";

const RoutesList = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<LoginandRegisterProtect />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesList;
