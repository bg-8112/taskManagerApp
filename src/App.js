import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn ? (
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <TopBar />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/inbox" component={Inbox} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/tasks" component={Tasks} />
              <Route path="/">
                <Redirect to="/dashboard" />
              </Route>
            </Switch>
          </div>
        </div>
      ) : (
        <Switch>
          <Route path="/login">
            <LoginPage onLogin={setIsLoggedIn} />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

export default App;
