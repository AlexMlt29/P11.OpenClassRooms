import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import './App.css';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
        </Routes>
      </Router>
    );
  }
  
export default App;
