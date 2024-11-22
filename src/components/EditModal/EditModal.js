import React, { useState, useEffect } from "react";
import "./EditModal.css";

function EditModal({ task, onClose, onSave }) {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editedTask]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Assignee:
          <input
            type="text"
            name="assignee"
            value={editedTask.assignee}
            onChange={handleChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate.split("T")[0]} // Extract date
            onChange={handleChange}
          />
        </label>
        <label>
          Due Time:
          <input
            type="time"
            name="dueTime"
            value={editedTask.dueDate.split("T")[1] || ""} // Extract time if available
            onChange={handleChange}
          />
        </label>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditModal;
