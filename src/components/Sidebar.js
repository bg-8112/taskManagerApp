import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <h2>Task Management</h2>
    </div>
    <ul className="sidebar-menu">
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/inbox">Inbox</Link>
      </li>
      <li>
        <Link to="/calendar">Calendar</Link>
      </li>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
