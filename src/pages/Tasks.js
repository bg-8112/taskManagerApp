import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Task 1 description",
      assignee: "John Doe",
      assignedDate: "2024-11-20",
      dueDate: "2024-11-25",
      status: "to-do",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Task 2 description",
      assignee: "Jane Smith",
      assignedDate: "2024-11-21",
      dueDate: "2024-11-26",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Task 3 description",
      assignee: "Alice Johnson",
      assignedDate: "2024-11-22",
      dueDate: "2024-11-27",
      status: "to-review",
    },
    {
      id: 4,
      title: "Task 4",
      description: "Task 4 description",
      assignee: "Bob Brown",
      assignedDate: "2024-11-23",
      dueDate: "2024-11-28",
      status: "completed",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    assignedDate: "",
    dueDate: "",
    status: "to-do",
  });

  const addTask = () => {
    const newTaskWithId = {
      ...newTask,
      id: tasks.length + 1,
    };
    setTasks([...tasks, newTaskWithId]);
    setNewTask({
      title: "",
      description: "",
      assignee: "",
      assignedDate: "",
      dueDate: "",
      status: "to-do",
    });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Assignee"
          value={newTask.assignee}
          onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
        />
        <input
          type="date"
          placeholder="Assigned Date"
          value={newTask.assignedDate}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedDate: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Due Date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="to-review">To Review</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <div className="tasks-board">
        <div className="tasks-column to-do">
          <h3>To Do</h3>
          {getTasksByStatus("to-do").map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div className="tasks-column in-progress">
          <h3>In Progress</h3>
          {getTasksByStatus("in-progress").map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div className="tasks-column to-review">
          <h3>To Review</h3>
          {getTasksByStatus("to-review").map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <div className="tasks-column completed">
          <h3>Completed</h3>
          {getTasksByStatus("completed").map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
