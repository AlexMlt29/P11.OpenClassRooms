import React from "react";
import image from "../../images/argentBankLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img className="main-nav-logo-image" src={image} alt="Argent Bank Logo" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/AuthPage">
            <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
