import React from "react";
import { render } from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginUser from "./pages/LoginUser";
import Dashboard from "./pages/Dashboard";
import DashboardUser from "./pages/DashboardUser";
import { SnackbarProvider } from "notistack";

const root = document.getElementById("root");
render(
  <SnackbarProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DashboardUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:number" element={<LoginUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </SnackbarProvider>,
  root
);
