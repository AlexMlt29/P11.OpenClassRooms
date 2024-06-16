// src/pages/ProfilPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import UserProfileAccount from "../components/UserProfileAccount";
import AuthForm from "../components/AuthForm";
import UserProfilePage from "../components/UserProfilePage";

function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile, error, loading, handleLogout } = UserProfilePage();

  return (
    <div className="app-container">
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link onClick={handleLogout} className="main-nav-item">
            {userProfile && `${userProfile.userName}`}
            <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
            Log Out
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile && `${userProfile.firstName} ${userProfile.lastName}`}!
          </h1>
          {!isEditing && <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? <p>Loading...</p> : <UserProfileAccount />}
        {isEditing && <AuthForm userProfile={userProfile} setIsEditing={setIsEditing} />}
      </main>
      <Footer />
    </div>
  );
}

export default ProfilPage;
