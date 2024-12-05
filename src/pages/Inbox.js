import React, { useState, useEffect } from "react";
import "./Inbox.css";
import { List, ListItem, ListItemText, Paper } from "@mui/material";

const Inbox = () => {
 
  return (
    <div className="inbox-container">
      <Paper elevation={3}>
        <List>
          
            <ListItem >
              <ListItemText  />
            </ListItem>
        
        </List>
      </Paper>
    </div>
  );
};

export default Inbox;
