import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Item from "antd/lib/list/Item";
import CartPage from "./pages/CartPage";
import Items from "./pages/Items";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bill from "./pages/Bills";
import Customers from "./pages/Customers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Homepage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoutes>
                <Items />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <CartPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoutes>
                <Bill />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoutes>
                <Customers />
              </ProtectedRoutes>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("pos-user")) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}
