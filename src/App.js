import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import "./App.css";


const tasks = [ { id: 1, title: "Complete project report", assignee: "John Doe", dueDate: "2024-11-25", priority: "Urgent", status: "complete", comments: "Comment 1, Comment 2" }, { id: 2, title: "Update website content", assignee: "Jane Smith", dueDate: "2024-11-26", priority: "High", status: "in-progress", comments: "Comment 1" }, { id: 3, title: "Plan team meeting", assignee: "Alice Johnson", dueDate: "2024-11-27", priority: "Normal", status: "to-do", comments: "Comment 1, Comment 2, Comment 3" }, { id: 4, title: "Conduct code review", assignee: "Bob Brown", dueDate: "2024-11-28", priority: "Low", status: "to-do", comments: "" } ];


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn ? (
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <TopBar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/calendar" element={<Calendar tasks={tasks} />} />
              <Route path="/tasks" element={<Tasks tasks={tasks}/>} />
              
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={setIsLoggedIn} />} />
          {/* Redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
