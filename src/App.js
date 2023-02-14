import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import AddNote from "./components/AddNote";
import { AuthProvider } from "./context/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="w-full h-screen bg-gray-900">
        <Router>
          <Header />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Home />} path="/home" exact />
              <Route element={<AddNote />} path="/addnote" />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
