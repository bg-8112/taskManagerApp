import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import { fetchTasks } from "./utils/api";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const loadTasks = async () =>{
      try{
        const taskData = await fetchTasks();
        setTasks(taskData);
      }catch (err){
        console.error('Error fetching tasks in App.js:', err );
      }
    };
    loadTasks();
  }, []);

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
              <Route path="/tasks" element={<Tasks tasks={tasks} />} />
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
