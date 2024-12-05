// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Fetch tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Fetch task activity log for a specific taskId
export const fetchTaskActivityLog = async (taskId) => {
  try {
    const response = await axios.get(`${BASE_URL}/task-activity-log/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching task activity log:', error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing task
export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTask , {headers: {'Content-Type': 'application/json'}});
    {console.log("here see pa" , taskId , updatedTask)}
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Fetch team members
export const fetchTeamMembers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/team-members`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};
