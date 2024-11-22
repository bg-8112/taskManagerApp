import React from "react";
import TaskBoard from "../components/TaskBoard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <TaskBoard />
    </div>
  );
}

export default Dashboard; // Make sure this line is present
