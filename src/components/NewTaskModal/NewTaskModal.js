import React, { useState } from "react";
import "../EditModal/EditModal.css"; // Reuse the same CSS for styling consistency

function NewTaskModal({ onClose, onSave }) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    assignedDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    status: "to-do",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(newTask);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Assignee:
          <input
            type="text"
            name="assignee"
            value={newTask.assignee}
            onChange={handleChange}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate.split("T")[0]} // Extract date if available
            onChange={handleChange}
          />
        </label>
        <label>
          Due Time:
          <input
            type="time"
            name="dueTime"
            value={newTask.dueDate.split("T")[1] || ""} // Extract time if available
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

export default NewTaskModal;
