import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from "./pages/SignInPage";
import LogInPage from "./pages/LogInPage";
import './App.css';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
        </Routes>
      </Router>
    );
  }
  
export default App;
