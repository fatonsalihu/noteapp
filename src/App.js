import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import AddNote from "./components/AddNote";

function App() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addnote" element={<AddNote />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
