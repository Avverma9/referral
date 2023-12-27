import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "./Sidebar.css"
const Sidebar = () => {
    const handleLogOut=()=>{
        localStorage.removeItem("email")
        localStorage.removeItem("password")
    }
  return (
    <nav className="sidebar">
      {/* <div className="sidebar-header">
        <h3>Octa-Trade</h3>
      </div> */}
      {/* <hr /> */}

      <ul className="list-unstyled components">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/shared">Share</Link>
        </li>
        <li>
          <Link  onClick={handleLogOut} to="/login">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
