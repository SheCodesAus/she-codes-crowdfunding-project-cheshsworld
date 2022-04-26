import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//styles
import "./App.css";

// components
import Nav from "./components/Nav/Nav";

//pages 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;