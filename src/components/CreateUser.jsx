import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import "./CreateUser.css";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleErrorMessage = () => {
    // Clear the error message
    setErrorMessage("");
  };

  const handleSuccessMessage = () => {
    // Clear the success message
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    const addUser = {
      username,
      email,
      password,
    };

    fetch(`https://sk-todo.herokuapp.com/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    })
      .then((res) => res.json())
      .then((result) => {
        // set the token in local storage
        localStorage.setItem("token", result.token);

        const message = result.error;

        if (message) {
          setErrorMessage(message);
          setMessage("");
        } else {
          setMessage("User created successfully!!");
          setErrorMessage("");
          // Redirect to /DisplayTodos
          window.location.href = "/DisplayTodos";
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setUsername("");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
      {errorMessage && (
        <div className="error-message-container">
          <div className="error-message">
            <p>{errorMessage}</p>
            <button
              className="error-message-button"
              onClick={handleErrorMessage}
            >
              X
            </button>
          </div>
        </div>
      )}
      {message && (
        <div className="success-message-container">
          <div className="success-message">
            <p>{message}</p>
            <button
              className="success-message-button"
              onClick={handleSuccessMessage}
            >
              X
            </button>
          </div>
        </div>
      )}
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Create User</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="button-user">
          Submit
        </button>
        <div className="switch-to-login">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
