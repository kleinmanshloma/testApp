import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/DisplayToDos" className="navbar-logo">
          To Do List
        </Link>

        <div className="navbar-user">
          {token ? (
            <Link to="/Logout" className="navbar-user-link">
              Logout
            </Link>
          ) : (
            <Link to="/Login" className="navbar-user-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
