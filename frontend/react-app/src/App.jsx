import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { fetchUserProfile, clearUserProfile } from "./redux/slices/profileSlice";
import { logout } from "./redux/slices/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.profile);
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (token && !userProfile && !loading) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token, userProfile, loading]);

  useEffect(() => {
    if (error) {
      alert("Une erreur de profil est survenue. Vous allez être redirigé vers la page d'accueil.");
      dispatch(clearUserProfile());
      dispatch(logout());
      window.location.href = "/";
    }
  }, [error, dispatch]);

  return (
    <Router>
      <Header userProfile={userProfile} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/ProfilePage" element={<ProfilePage userProfile={userProfile} />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
