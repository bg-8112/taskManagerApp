import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
// import EditModal from "./EditModal/EditModal.js";
// import NewTaskModal from "./NewTaskModal/NewTaskModal.js";
import { fetchTasks } from "../utils/api";
import "./TaskBoard.css";

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  useEffect(() =>{
    const loadTasks = async () => {
      try{
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      }catch(err){
        console.error('Error fetching tasks:' , err);
      }
    }
    loadTasks()
  } , []);

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="task-board">
      <div className="task-board-columns">
        <div className="task-board-column to-do">
          <h3>To Do</h3>
          {getTasksByStatus("to-do").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
        <div className="task-board-column in-progress">
          <h3>In Progress</h3>
          {getTasksByStatus("in-progress").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
        <div className="task-board-column to-review">
          <h3>To Review</h3>
          {getTasksByStatus("to-review").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
        <div className="task-board-column completed">
          <h3>Completed</h3>
          {getTasksByStatus("complete").map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;
