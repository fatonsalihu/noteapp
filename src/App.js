import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import AddNote from "./pages/AddNote";
import { AuthProvider } from "./context/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen min-w-screen  bg-gray-900">
        <Router>
          <Header />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Home />} path="/home">
                <Route element={<AddNote />} path="addnote" />
                <Route element={<AddNote />} path="editnote/:id" />
              </Route>
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
