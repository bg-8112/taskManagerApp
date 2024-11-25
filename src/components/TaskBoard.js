import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import EditModal from "./EditModal/EditModal.js";
import NewTaskModal from "./NewTaskModal/NewTaskModal.js"; // Import the new modal
import "./TaskBoard.css";

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('https://api.yourdatabase.com/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  const addTask = (newTask) => {
    newTask.id = tasks.length + 1;
    setTasks([...tasks, newTask]);
  };

  const onEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTask(taskToEdit);
  };

  const onSaveEdit = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="task-board">
      <div className="task-board-header">
        <h2>Task Board</h2>
        <button
          className="task-board-button"
          onClick={() => setShowNewTaskModal(true)}
        >
          Add Task
        </button>
      </div>
      <div className="task-board-columns">
        <div className="task-board-column to-do">
          <h3>To Do</h3>
          {getTasksByStatus("to-do").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
        <div className="task-board-column in-progress">
          <h3>In Progress</h3>
          {getTasksByStatus("in-progress").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
        <div className="task-board-column to-review">
          <h3>To Review</h3>
          {getTasksByStatus("to-review").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
        <div className="task-board-column completed">
          <h3>Completed</h3>
          {getTasksByStatus("completed").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
      {editingTask && (
        <EditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={onSaveEdit}
        />
      )}
      {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onSave={addTask}
        />
      )}
    </div>
  );
}

export default TaskBoard;
