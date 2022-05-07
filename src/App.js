import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//styles
import "./App.css";

// components
import Nav from "./components/Nav/Nav";

//pages 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPages/ProjectPage";
import ProjectFormPage from "./pages/ProjectPages/ProjectFormPage";
import RegisterPage from "./pages/RegisterFormPage";
import ProfilePage from "./pages/UserPages/ProfilePage";


function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/projects/create" element={<ProjectFormPage />} />
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="/users/register/" element={<RegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;