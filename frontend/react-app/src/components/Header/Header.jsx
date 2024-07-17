import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import image from "../../images/argentBankLogo.png";
import { useDispatch } from "react-redux";
import { clearUserProfile } from "../../redux/slices/profileSlice";
import { logout } from "../../redux/slices/authSlice";

function Header({ userProfile }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
    window.location.href = "/";
  };

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={image} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {userProfile ? (
            <>
              <Link to="/ProfilePage" className="main-nav-item">
                {userProfile.userName}
              </Link>
              <Link onClick={handleLogout} className="main-nav-item">
                <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
                Log Out
              </Link>
            </>
          ) : (
            <Link to="/AuthPage">
              <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
