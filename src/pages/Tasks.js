import React, { useState } from "react";
import "./Tasks.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const Tasks = ({ tasks = [] }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [taskList, setTaskList] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleDelete = (taskId) => {
    setTaskList(taskList.filter(task => task.id !== taskId));
  };

  const handleSave = (updatedTask) => {
    const oldTask = taskList.find(task => task.id === updatedTask.id);
    logActivityChanges(oldTask, updatedTask);
    setTaskList(taskList.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
    setSelectedTask(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleDialogClose = () => {
    setSelectedTask(null);
  };

  const logActivityChanges = (oldTask, newTask) => {
    const changes = [];
    Object.keys(oldTask).forEach(key => {
      if (oldTask[key] !== newTask[key]) {
        changes.push(`${key} changed from "${oldTask[key]}" to "${newTask[key]}"`);
      }
    });
    if (changes.length > 0) {
      logActivity(changes.join(", "));
    }
  };

  const logActivity = (message) => {
    setActivityLog(prevLog => [...prevLog, { message, timestamp: new Date().toLocaleString() }]);
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <div className="tasks-column task-name">Name</div>
        <div className="tasks-column task-assignee">Assignee</div>
        <div className="tasks-column task-due-date">Due Date</div>
        <div className="tasks-column task-priority">Priority</div>
        <div className="tasks-column task-status">Status</div>
        <div className="tasks-column task-comments">Comments</div>
        <div className="tasks-column task-actions">Actions</div>
      </div>
      {taskList.map((task) => (
        <div key={task.id} className="task-row">
          <div className="tasks-column task-name" onClick={() => handleTaskClick(task)}>
            {task.title}
          </div>
          <div className="tasks-column task-assignee">{task.assignee}</div>
          <div className="tasks-column task-due-date">{task.dueDate}</div>
          <div className="tasks-column task-priority">{task.priority ? <PriorityLabel priority={task.priority} /> : "None"}</div>
          <div className="tasks-column task-status">{task.status}</div>
          <div className="tasks-column task-comments"><CommentsLabel comments={task.comments} /></div>
          <div className="tasks-column task-actions">
            <IconButton onClick={(e) => { e.stopPropagation(); handleEdit(task); }} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      ))}

      <Dialog open={!!selectedTask} onClose={handleDialogClose} maxWidth="lg" fullWidth>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent className="dialog-content">
          <div className="dialog-main">
            {selectedTask && (
              <TaskEditForm task={selectedTask} onSave={handleSave} onCancel={handleDialogClose} />
            )}
          </div>
          <div className="dialog-activity">
            <h3>Activity</h3>
            <ul>
              {activityLog.map((log, index) => (
                <li key={index}>
                  <p>{log.message}</p>
                  <span>{log.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TaskEditForm = ({ task, onSave, onCancel }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="task-edit-form">
      <label>
        Title:
        <input type="text" name="title" value={updatedTask.title} onChange={handleChange} />
      </label>
      <div className="form-row">
        <label>
          Assignee:
          <Select name="assignee" value={updatedTask.assignee} onChange={handleChange} className="popup-dropdown">
            <MenuItem value="John Doe">John Doe</MenuItem>
            <MenuItem value="Jane Smith">Jane Smith</MenuItem>
            <MenuItem value="Alice Johnson">Alice Johnson</MenuItem>
            <MenuItem value="Bob Brown">Bob Brown</MenuItem>
          </Select>
        </label>
        <label>
          Due Date:
          <input type="date" name="dueDate" value={updatedTask.dueDate} onChange={handleChange}  />
        </label>
      </div>
      <div className="form-row">
        <label>
          Priority:
          <Select name="priority" value={updatedTask.priority} onChange={handleChange} className="popup-dropdown">
            <MenuItem value="Urgent"><PriorityLabel priority="Urgent" /></MenuItem>
            <MenuItem value="High"><PriorityLabel priority="High" /></MenuItem>
            <MenuItem value="Normal"><PriorityLabel priority="Normal" /></MenuItem>
            <MenuItem value="Low"><PriorityLabel priority="Low" /></MenuItem>
          </Select>
        </label>
        <label>
          Status:
          <Select name="status" value={updatedTask.status} onChange={handleChange} className="popup-dropdown">
            <MenuItem value="to-do">To-Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </label>
      </div>
      <label>
        Comments:
        <textarea name="comments" value={updatedTask.comments} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

const PriorityLabel = ({ priority }) => {
  const getColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "red";
      case "High":
        return "orange";
      case "Normal":
        return "blue";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <span style={{ display: 'flex', alignItems: 'center', color: getColor(priority) }}>
      <FlagIcon fontSize="small" style={{ marginRight: 4 }} />
      {priority}
    </span>
  );
};

const CommentsLabel = ({ comments }) => {
  const commentsArray = comments ? comments.split(',').filter(comment => comment.trim() !== "").length : 0; // Count the number of valid comments

  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <CommentIcon fontSize="small" style={{ marginRight: 4 }} />
      {commentsArray}
    </span>
  );
};

export default Tasks;
