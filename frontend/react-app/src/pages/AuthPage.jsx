import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle}/>
          <h1>Sign In</h1>
          <AuthForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
