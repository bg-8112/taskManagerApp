import React from "react";
import DropdownButton from "./DropdownButton/DropdownButton";
import "./TaskCard.css";

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className={`task-card ${task.status.toLowerCase().replace(" ", "-")}`}>
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <DropdownButton
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      </div>
      <p>{task.description}</p>
      <p>
        <strong>Assignee:</strong> {task.assignee}
      </p>
      <p>
        <strong>Assigned Date:</strong> {task.assignedDate}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate}
      </p>
    </div>
  );
}

export default TaskCard;
