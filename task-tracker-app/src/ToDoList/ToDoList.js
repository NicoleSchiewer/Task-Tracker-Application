import React, { useState } from 'react';
import TaskList from './TaskList';
import classes from './ToDoList.module.css';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const ToDoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [taskType, setTaskType] = useState('work');
  const [taskPriority, setTaskPriority] = useState('low');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', type: 'work', priority: 'high' },
    { id: 2, text: 'Task 2', type: 'home', priority: 'low' },
    { id: 3, text: 'Task 3', type: 'home', priority: 'medium' }
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [setEditedText] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTaskTypeChange = (e) => {
    setTaskType(e.target.value);
  };

  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: inputValue.trim(),
        type: taskType,
        priority: taskPriority
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setOpenModal(false);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const markTaskCompleted = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleEditStart = (task) => {
    setIsEditing(task.id);
    setEditedText(task.text);
  };

  const incompleteTaskCount = tasks.length;
  const completeTaskCount = completedTasks.length;
  const totalTasks = incompleteTaskCount + completeTaskCount;

  const getPriorityCounts = () => {
    const priorityCounts = {
      high: 0,
      medium: 0,
      low: 0
    };

    tasks.forEach((task) => {
      priorityCounts[task.priority]++;
    });

    return priorityCounts;
  };

  const priorityCounts = getPriorityCounts();

  return (
    <div className={classes.taskTrackerContainer}>
      <h1 className={classes.taskTrackerHeader}>Task Manager</h1>
      <div className={classes.buttonContainer}>
        <button
          className={classes.addTaskButton}
          onClick={() => setOpenModal(true)}
        >
          Add Task
        </button>
      </div>
      <Dialog
        className={classes.modal}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle className={classes.modalTitle}>Add Task</DialogTitle>
        <DialogContent className={classes.modalContent}>
          <TextField
            className={classes.selectInput}
            autoFocus
            margin='dense'
            label='Task Name'
            type='text'
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id='task-type-label'>Task Type</InputLabel>
            <Select
              className={classes.selectInput}
              labelId='task-type-label'
              value={taskType}
              onChange={handleTaskTypeChange}
            >
              <MenuItem value='work'>Work</MenuItem>
              <MenuItem value='home'>Home</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel className={classes.taskLabel}>Task Priority</InputLabel>
            <Select
              className={classes.selectInput}
              value={taskPriority}
              onChange={handleTaskPriorityChange}
            >
              <MenuItem value='high'>High</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='low'>Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.modalActions}>
          <Button
            className={classes.cancel}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button
            className={classes.addTaskButton}
            onClick={handleAddTask}
            variant='contained'
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <table className={classes.priorityTable}>
        <thead>
          <tr>
            <th className={classes.priorityHeader}>TOTAL TASKS</th>
            <th>{totalTasks}</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(priorityCounts).map(([priority, count]) => (
            <tr key={priority}>
              <td className={classes[priority]}>{priority}</td>
              <td className={classes.countCells}>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={classes.completeIncompleteTable}>
        <thead>
          <tr>
            <th className={classes.inProgressHeader}>In-Progress</th>
            <th className={classes.completedHeader}>Complete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{incompleteTaskCount}</td>
            <td>{completeTaskCount}</td>
          </tr>
        </tbody>
      </table>
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onEditStart={handleEditStart}
        onDelete={deleteTask}
        onComplete={markTaskCompleted}
      />
      <div>
        <h3>Completed Tasks</h3>
        {completedTasks.map((task) => (
          <p key={task.id}>
            {task.text} - {task.type} - {task.priority}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
