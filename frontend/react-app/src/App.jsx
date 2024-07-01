import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { fetchUserProfile } from "./redux/slices/profileSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.profile);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !userProfile) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token, userProfile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <Header userProfile={userProfile} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/ProfilePage" element={<ProfilePage userProfile={userProfile} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
