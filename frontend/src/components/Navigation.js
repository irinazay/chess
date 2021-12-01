import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import "../styles/Navigation.css";

function Navigation() {
  const { isAuthenticated } = useAuth0();
  return (
    <nav className="Navigation">
      <Link className="navbar-brand" to="/">
        Chess
      </Link>
      {isAuthenticated ? (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Profile />
          </li>
          <li className="nav-item">
            <LogoutButton />
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <LoginButton />
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navigation;
