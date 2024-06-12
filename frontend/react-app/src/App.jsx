import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from "./pages/SignInPage";
import ProfilPage from "./pages/ProfilPage";
import './App.css';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/ProfilPage" element={<ProfilPage />} />
        </Routes>
      </Router>
    );
  }
  
export default App;
