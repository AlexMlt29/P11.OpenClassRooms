import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure, saveEmail } from "../../redux/slices/authSlice";
import { setCookie, getCookie } from "../../components/Cookie/Cookie";
import "../Authentification/Auth.css";

const AuthForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const savedRememberMe = useSelector((state) => state.auth.savedRememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(savedRememberMe);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && rememberMe) {
      fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setEmail(data.body.email);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [dispatch, rememberMe]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      if (rememberMe) {
        setCookie("token", data.body.token, 30); // durée de vie du cookie en jours
        localStorage.setItem("token", data.body.token); // Token dans local storage
      } else {
        setCookie("token", data.body.token); // Token dans cookie
        localStorage.removeItem("token");
      }

      dispatch(loginSuccess({ token: data.body.token, email, rememberMe }));
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
