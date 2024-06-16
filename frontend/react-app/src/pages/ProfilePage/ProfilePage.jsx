import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../images/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer/Footer";
import UserProfileAccount from "../../components/UserProfile/UserProfileAccount";
import EditProfilePage from "../../components/UserProfile/EditProfileForm";
import UserProfilePage from "../../components/UserProfile/UserProfilePage";
import "./ProfilePage.css";

function ProfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile, error, loading, handleLogout } = UserProfilePage();

  return (
    <div className="app-container">
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={image} alt="Argent Bank Logo" />
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
            {userProfile && `${userProfile.firstName} ${userProfile.lastName}`} !
          </h1>
          {!isEditing && <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>}
          {isEditing && <EditProfilePage userProfile={userProfile} setIsEditing={setIsEditing} />}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? <p>Loading...</p> : <UserProfileAccount />}
      </main>
      <Footer />
    </div>
  );
}

export default ProfilPage;
