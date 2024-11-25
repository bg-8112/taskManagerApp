import React, { useState, useEffect } from "react";
import "./Inbox.css";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { WebSocket as WebSocketPolyfill } from 'ws';

const Inbox = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocketPolyfill('wss://your-slack-websocket-url'); // Replace with your Slack WebSocket URL

    ws.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="inbox-container">
      <Paper elevation={3}>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index}>
              <ListItemText primary={notification.message} secondary={notification.timestamp} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Inbox;
