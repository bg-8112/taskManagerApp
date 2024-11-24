import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Sign out logic here
    // For now, we'll just redirect to the login page
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <input type="text" placeholder="Search" />
      </div>
      <div className="topbar-right">
        <div className="account-icon" onClick={toggleDropdown}>
          <img
            src="https://e7.pngegg.com/pngimages/518/320/png-clipart-computer-icons-mobile-app-development-android-my-account-icon-blue-text-thumbnail.png"
            alt="Account DP"
          />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
