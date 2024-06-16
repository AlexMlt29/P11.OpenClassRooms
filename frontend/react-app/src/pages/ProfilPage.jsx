import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ProfilAccount from "../components/ProfilAccount"

function ProfilPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
      fetchProfile(token);
    }
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.body);
      } else {
        setError(`Failed to fetch profile data.`);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    navigate('/');
  }

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
            {userProfile && `${userProfile.firstName} ${userProfile.lastName}`} !
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        {error && <p className="error-message">{error}</p>}
        <ProfilAccount />
      </main>
      <Footer />
    </div>
  );
}

export default ProfilPage;
