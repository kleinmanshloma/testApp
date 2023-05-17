import React, { useState } from "react";
import URL_DEV from "./URL";
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

  const handleSuccesMessage = () => {
    // Clear the succes message
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

    fetch(`${URL_DEV}user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    })
      .then((res) => res.json())
      .then((result) => {
        const message = result.error;

        if (message) {
          setErrorMessage(message);
          setMessage("");
          return;
        }
        if (!message) {
          setMessage("User created succesfully!!");
          setErrorMessage("");
          return;
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
        <div className="error-message">
          <p>{errorMessage}</p>
          <button className="error-message-button" onClick={handleErrorMessage}>
            X
          </button>
        </div>
      )}
      {message && (
        <div className="succes-message">
          <p>{message}</p>
          <button
            className="succes-message-button"
            onClick={handleSuccesMessage}
          >
            X
          </button>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateUser;
