import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AuthForm from "../../components/Authentification/AuthForm";
import "./AuthPage.css";

const AuthPage = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="app-container">
      <main className="main bg-dark">
        <section className="sign-in-content">
          {!token ? (
            <>
              <FontAwesomeIcon icon={faUserCircle} />
              <h1>Sign In</h1>
              <AuthForm />
            </>
          ) : (
            <h1>You are already logged in !</h1>
          )}
        </section>
      </main>
    </div>
  );
};

export default AuthPage;
