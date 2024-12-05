import React, { useState, useEffect, act } from "react";
import "./Tasks.css";
import { addTask, updateTask, deleteTask, fetchTasks , fetchTaskActivityLog ,fetchTeamMembers } from "../utils/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import CommentIcon from "@mui/icons-material/Comment";
import { IconButton, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const Tasks = () => {
  const[tasks, setTasks] =useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskList, setTaskList] = useState(tasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskActivityLog , setTaskActivityLog] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false); // New state for Add Task dialog
  const [errorMessage , setErrorMessage] = useState('');

  useEffect(() => {
    const loadTeamMembers = async() =>{
      try{
        const members = await fetchTeamMembers();
        setTeamMembers(members);
      }catch(err){
        console.error('Error fetching team members:' , err);
      }
    };
    loadTeamMembers();
  }, []);


  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(); // Fetch tasks using the API
        
        setTasks(fetchedTasks); // Update the state with the fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  useEffect(() => {
    const loadTaskActivityLog = async () => {
      if (selectedTask) {
        try {
          const activityLog = await fetchTaskActivityLog(selectedTask.id);
          console.log("act here:" ,activityLog)
          setTaskActivityLog((prevLog) => ({
            ...prevLog,
            [selectedTask.id]: activityLog,
          }));
        } catch (error) {
          console.error('Error fetching task activity log:', error);
        }
      }
    };

    loadTaskActivityLog();
  }, [selectedTask]);


  // const handleEdit = async (task) => {
  //   try {
  //     const updatedTask = await updateTask(task.id, task); // Update task using API
  //     console.log("b4" , task , task.id)
  //     setTaskList(taskList.map(t => (t.id === updatedTask.id ? updatedTask : t)));
  //   } catch (error) {
  //     console.error('Error updating task:', error);
  //   }
  // };

  const handleEditSave = async (updatedTask) => {
    try {
      // Update task using API
      const taskToUpdate = await updateTask(updatedTask.id, updatedTask); 
      console.log("Before update:", updatedTask, updatedTask.id);
  
      // Log activity changes after the task is updated
      const oldTask = taskList.find(task => task.id === updatedTask.id);
      const oldComments = Array.isArray(oldTask.comments) ? oldTask.comments : [];

      logActivityChanges(oldTask, updatedTask);
  
      // Combine the comments from old and new tasks
      const updatedComments = [...oldComments, updatedTask.comments].filter(Boolean);
  
      // Update the task list with the updated task and comments
      setTaskList(taskList.map(task => 
        (task.id === taskToUpdate.id ? {...taskToUpdate, comments: updatedComments} : task)));
  
      // Clear the editing and selected task states
      const updatedActivityLog = await fetchTaskActivityLog(taskToUpdate.id);

      // Update the activity log state for the specific task
      setTaskActivityLog(prevLog => ({
      ...prevLog,
      [taskToUpdate.id]: updatedActivityLog,
    }));
      // setEditingTask(null);
      // setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId); // Delete task using API
      setTaskList(taskList.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // const handleSave = (updatedTask) => {
  //   const oldTask = taskList.find(task => task.id === updatedTask.id);
  //   logActivityChanges(oldTask, updatedTask);

  //   const updatedComments = (oldTask.comments || []).concat(updatedTask.comments).filter(Boolean);


  //   setTaskList(taskList.map(task => 
  //     (task.id === updatedTask.id ? {...updatedTask, comments: updatedComments} : task )));
  //   setEditingTask(null);
  //   setSelectedTask(null);
  // };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleDialogClose = () => {
    setSelectedTask(null);
  };

  const logActivityChanges = (oldTask, newTask) => {
    const changes = [];
    let commentChange = null;

    Object.keys(oldTask).forEach(key => {

      if (key !=='comments' && oldTask[key] !== newTask[key]) {

        if(key ==='due_date'){

          const oldFormattedDate = new Date(oldTask[key]).toLocaleDateString('en-GB');
          const newFormattedDate = new Date(newTask[key]).toLocaleDateString('en-GB');

          console.log("old , new pa" , oldFormattedDate , newFormattedDate )
          if(oldFormattedDate !== newFormattedDate){
            changes.push(`Due Date changed from "${oldFormattedDate}" to "${newFormattedDate}"`);
          }
          
        }else{
          changes.push(`${key} changed from "${oldTask[key]}" to "${newTask[key]}"`);
        }
       
      }
    });

    if(newTask.comments && newTask.comments !== oldTask.comments){
      commentChange = `User added a comment: "${newTask.comments}"`
    }
    if(changes.length > 0 || commentChange){
      const combinedMessage = [
        ...changes,
        commentChange
      ].filter(Boolean).join("\n");
      logActivityForTask(newTask.id , combinedMessage)
    }
  }

  const logActivityForTask = (taskId , message) => {
        setTaskActivityLog(prevLog => {
          const taskLogs = prevLog[taskId] || [];
          const newLog = {message , timestamp: new Date().toLocaleDateString('en-GB' , {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          } ) };
          // console.log('Updating activity log:' , {taskId , newLog})
          return {...prevLog , [taskId]: [...taskLogs ,newLog]};
        });
  };

 
  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await addTask(newTask); // Add task using API
      setTaskList([...taskList, addedTask]);
      setAddTaskDialogOpen(false);
    } catch (error) {
      setErrorMessage('Error adding task. Please try again')
      console.error('Error adding task:', error);
    }
  };


  return (
    <div className="tasks-container">
      {/* Add Task Button placed at the top */}
      <Button onClick={() => setAddTaskDialogOpen(true)} className="add-task-button" color="primary" variant="contained" style={{ marginBottom: '20px' }}>
        Add Task
      </Button>

      <div className="tasks-header">
        <div className="tasks-column task-name">Name</div>
        <div className="tasks-column task-assignee">Assignee</div>
        <div className="tasks-column task-due-date">Due Date</div>
        <div className="tasks-column task-priority">Priority</div>
        <div className="tasks-column task-status">Status</div>
        <div className="tasks-column task-comments">Comments</div>
        <div className="tasks-column task-actions">Actions</div>
      </div>

      {taskList.map((task) => {
        
        return(
        <div key={task.id} className="task-row">
          <div className="tasks-column task-name" onClick={() => handleTaskClick(task)}>
            {task.title}
          </div>
          <div className="tasks-column task-assignee">{task.assignee}</div>
          <div className="tasks-column task-due-date">{task.due_date ? new Date(task.due_date).toLocaleDateString('en-GB') : 'No Date'}</div>
          <div className="tasks-column task-priority">{task.priority ? <PriorityLabel priority={task.priority} /> : "None"}</div>
          <div className="tasks-column task-status">{task.status}</div>
          <div className="tasks-column task-comments"><CommentsLabel comments={task.comments} /></div>
          <div className="tasks-column task-actions">
            <IconButton onClick={(e) => { e.stopPropagation(); setSelectedTask(task); }} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      )})}

      {/* Add Task Dialog */}
      <Dialog open={addTaskDialogOpen} onClose={() => setAddTaskDialogOpen(false)} maxWidth="md">
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent className="dialog-content">
          <TaskAddForm onSave={handleAddTask} onCancel={() => setAddTaskDialogOpen(false)} teamMembers={teamMembers} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleAddTaskDialogClose} color="primary">Discard</Button>
        </DialogActions> */}
      </Dialog>

      {/* tast edit form dialog */}
      <Dialog open={!!selectedTask} onClose={handleDialogClose} maxWidth="lg" fullWidth>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent className="dialog-content">
          <div className="dialog-main">
            {selectedTask && (
              <TaskEditForm task={selectedTask} onSave={handleEditSave} onCancel={handleDialogClose} teamMembers={teamMembers} />
            )}
          </div>
          <div className="dialog-activity">
            <h3>Activity</h3>
            {taskActivityLog[selectedTask?.id] && taskActivityLog[selectedTask?.id].length > 0 ? (
              <ul>
                {taskActivityLog[selectedTask?.id].map((log, index) => (
                  <li key={log.id}>
                    <p>{log.activity}</p>
                    <span>{new Date(log.created_at).toLocaleString('en-GB' , {hour12: true})}</span> {/* Format the timestamp */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No activity logs found.</p>
          )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TaskEditForm = ({ task, onSave, onCancel, teamMembers }) => {
  const [updatedTask, setUpdatedTask] = useState(() =>{
    const formatDate = (date) => {
      const localDate = new Date(date);
      localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
      
      return localDate.toISOString().split('T')[0];
    }
    
    return {
      ...task,
      due_date: task.due_date ?  formatDate(task.due_date) : '' ,
      priority: task.priority || 'Normal',
      description: task.description || '',
      comments: '',
    }
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === 'due_date'){
      console.log('calender date check' , value);
    }
    setUpdatedTask({ ...updatedTask, [name]: value });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedTask);
   

    setUpdatedTask(prevState => ({
      ...prevState,
      comments: '',
    }));
  };



  return (
    <form onSubmit={handleSubmit} className="task-edit-form">
      <label>
        Title:
        <input type="text" name="title" value={updatedTask.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={updatedTask.description} onChange={handleChange} className="task-edit-form-description" />
      </label>
      <div className="form-row">
        <label>
          Assignee:
          <Select name="assignee" value={updatedTask.assignee} onChange={handleChange} className="popup-dropdown">
            {teamMembers.map(member => (
              <MenuItem key={member.id} value={member.name}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </label>
        <label>
          Due Date:
          <input type="date" name="due_date" value={updatedTask.due_date} onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Priority:
          <Select name="priority" value={updatedTask.priority} onChange={handleChange} className="popup-dropdown">
            <MenuItem value="Urgent"><PriorityLabel priority="Urgent"  /></MenuItem>
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
        <textarea name="comments" value={updatedTask.comments} onChange={handleChange} className="task-edit-form-comments" />
      </label>
      <div className="form-buttons">
        <Button type="submit" color="primary">Save</Button>
      </div>
    </form>
  );
};

const TaskAddForm = ({ onSave, onCancel, teamMembers }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    due_date: '',
    priority: 'Normal',
    status: 'to-do',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!newTask.title || !newTask.assignee){
      alert(`Task title or Assignee field are missing`)
      return;
    }
    
    onSave(newTask);
  };

  return (
    <form onSubmit={handleSubmit} className="task-add-form" >
      <label>
        Title:
        <input type="text" name="title" value={newTask.title} onChange={handleChange} />
      </label>
      <label>
        Description: 
        <textarea name= "description" value={newTask.description} onChange={handleChange} placeholder="Enter Task Descriotion" className="task-add-form-description"/>
      </label>
      <div className="form-row">
        <label>
          Assignee:
          <Select name="assignee" value={newTask.assignee} onChange={handleChange} className="popup-dropdown">
            {teamMembers.map(member => (
              <MenuItem key={member.id} value={member.name}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </label>
        <label>
          Due Date:
          <input type="date" name="due_date" value={newTask.due_date} onChange={handleChange} />
        </label>
      </div>
      <div className="form-row">
        <label>
          Priority:
          <Select name="priority" value={newTask.priority} onChange={handleChange} className="popup-dropdown">
            <MenuItem value="Urgent"><PriorityLabel priority="Urgent" /></MenuItem>
            <MenuItem value="High"><PriorityLabel priority="High" /></MenuItem>
            <MenuItem value="Normal"><PriorityLabel priority="Normal" /></MenuItem>
            <MenuItem value="Low"><PriorityLabel priority="Low" /></MenuItem>
          </Select>
        </label>
        <label>
          Status:
          <Select name="status" value={newTask.status} onChange={handleChange} className="popup-dropdown">
            <MenuItem value="to-do">To-Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="complete">Complete</MenuItem>
          </Select>
        </label>
      </div>
      <div className="form-buttons">
        <Button type="submit" color="primary">Save</Button>
        <Button onClick={onCancel} color="secondary">Cancel</Button>
      </div>
    </form>
  );
};

const PriorityLabel = ({ priority }) => {
  let color , icon;
  switch (priority) {
    case 'Urgent':
      color = 'red';
      icon = <FlagIcon />;
      break;
    case 'High':
      color = 'orange';
      icon = <FlagIcon />;
      break;
    case 'Normal':
      color = 'green';
      icon = <FlagIcon />;
      break;
    case 'Low':
      color = 'blue';
      icon = <FlagIcon />;
      break;
    default:
      color = 'grey';
      icon = <FlagIcon />;
      break;
  }
  return <span style={{ color, display: 'flex' , alignItems: 'center' }}><FlagIcon style={{marginRight: '5px'}} /> {priority}</span>;
};

const CommentsLabel = ({ comments }) => {
  const commentCount = Array.isArray(comments) ? comments.length : (comments ? 1 : 0);
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <CommentIcon style={{ marginRight: '5px' }} />
      {commentCount}
    </span>
  );
};


export default Tasks;
