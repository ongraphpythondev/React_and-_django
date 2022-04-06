import React from "react";
import {
  Link
} from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="#">
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
              <li className="nav-item active">
                <Link className="nav-link" to="/registration">
                  Registration
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
