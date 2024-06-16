import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/slices/profileSlice";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ProfilAccount from "../components/ProfilAccount";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, error, loading } = useSelector((state) => state.profile);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    } else {
      navigate('/');
    }
  }, [dispatch, navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

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
        {loading ? <p>Loading...</p> : <ProfilAccount />}
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;
