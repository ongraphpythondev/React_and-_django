import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <Link className="navbar-brand" style={{"marginLeft":"26px"}} to="#">
          React
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                About
              </Link>
            </li>
            {user ? (
              <li className="nav-item active">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link className="nav-link" to="/registration">
                  Registration
                </Link>
              </li>
            )}

            {user ? (
              <li className="nav-item active">
                <span
                  className="nav-link"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  Logout{" "}
                </span>
              </li>
            ) : (
              <li className="nav-item active">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item active ms-auto">
                <Link className="nav-link" style={{"marginRight":"26px"}} to="/profile">
                  {user.username}
                </Link>
              </li>
            ) : null
            }
          </ul>
        </div>
      </nav>
    </>
  );
}
