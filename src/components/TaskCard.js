import React from "react";
import DropdownButton from "./DropdownButton/DropdownButton";
import "./TaskCard.css";

function TaskCard({ task, onEdit, onDelete }) {

  const formattedAssignedDate = new Date(task.assignedDate).toLocaleDateString()
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString();
  return (
    <div className={`task-card ${task.status.toLowerCase().replace(" ", "-")}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
      </div>
      <p>{task.description}</p>
      <p>
        <strong>Assignee:</strong> {Array.isArray(task.assignee) ? task.assignee.join(", ") : task.assignee}
      </p>
      <p>
        <strong>Assigned Date:</strong> {formattedAssignedDate}
      </p>
      <p>
        <strong>Due Date:</strong> {formattedDueDate}
      </p>

      {/* {console.log(task , task.assignedDate)} */}
    </div>
  );
}

export default TaskCard;
