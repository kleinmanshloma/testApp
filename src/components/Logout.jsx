import React from "react";
import config from "../config";
import { Link } from "react-router-dom";

const Logout = () => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // fetch to logout /users/logout
    fetch(`${config.URL_DEV}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // remove the token from local storage
        localStorage.removeItem("token");
        // Redirect to /DisplayTodos
        window.location.href = "/Login";
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="logout-container">
      <h2>
        You are being logged out. <br />
        <Link to="/Login" className="logout-link" onClick={handleLogout}>
          Login
        </Link>
      </h2>
      {/*  <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Logout;
