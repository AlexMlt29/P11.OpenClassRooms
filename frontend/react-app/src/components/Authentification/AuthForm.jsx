import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import "../Authentification/Auth.css";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const error = useSelector(state => state.auth.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      localStorage.setItem("token", data.body.token);

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      dispatch(loginSuccess({ user: data.body.user, token: data.body.token }));
      window.location.href = "/ProfilePage";
    } catch (err) {
      dispatch(loginFailure("Email ou mot de passe incorrect."));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input id="username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button className="sign-in-button">Sign In</button>
    </form>
  );
};

export default AuthForm;