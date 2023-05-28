import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";

import "./Login.css"; // Import the CSS file for the Login component

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic with email and password

    fetch(`${config.URL_PROD}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((result) => {
        // set the token in local storage
        localStorage.setItem("token", result.token);
        // Redirect to /DisplayTodos
        window.location.href = "/DisplayTodos";

        const message = result.error;
        if (message) {
          alert(message);
          return;
        }
        if (!message) {
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/CreateUser">Create one</Link>.
      </p>
    </div>
  );
}

export default Login;
