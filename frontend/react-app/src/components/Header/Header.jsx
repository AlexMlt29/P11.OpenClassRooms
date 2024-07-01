import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import image from '../../images/argentBankLogo.png';
import { fetchUserProfile, clearUserProfile } from '../../redux/slices/profileSlice';

function Header() {
  const dispatch = useDispatch();
  const { userProfile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUserProfile());
    window.location.href = '/';
  };

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={image} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {loading && <p>Loading...</p>}
          {userProfile ? (
            <Link onClick={handleLogout} className="main-nav-item">
              {userProfile.userName}
              <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
              Log Out
            </Link>
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
