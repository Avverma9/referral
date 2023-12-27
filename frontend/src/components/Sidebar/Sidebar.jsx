import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";
import "./Sidebar.css";
const Sidebar = () => {
  const location = useLocation();
  const handleLogOut = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };
  if (location.pathname !== "/profile" && location.pathname !== "shared") {
    return null;
  }
  return (
    <nav className="sidebar">
      <ul className="list-unstyled components">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/shared">Share</Link>
        </li>
        <li>
          <Link onClick={handleLogOut} to="/login">
            Log Out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
