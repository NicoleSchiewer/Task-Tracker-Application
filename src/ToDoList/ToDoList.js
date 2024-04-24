import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import classes from './ToDoList.module.css';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditTaskModal from './EditTaskModal';

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
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

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
    // Update isEditing to true first
    setIsEditing(true);

    // Set editedTask to the clicked task
    const taskBeingEdited = setEditedTask(task);
    console.log(editedTask);
    return taskBeingEdited;
  };

  useEffect(() => {
    console.log(editedTask);
    if (editedTask !== null) {
      setEditModalOpen(true);
    }
  }, [editedTask]);

  const handleEdit = (editedTask) => {
    console.log(editedTask);
    // Map over the tasks array to find the task with the same ID as the edited task
    const updatedTasks = tasks.map((task) => {
      if (task.id === editedTask.id) {
        // If the ID matches, update this task with the edited task object
        return editedTask;
      }
      // Return unchanged task if ID doesn't match
      return task;
    });
    console.log(updatedTasks);
    // Update the tasks state with the modified task list
    setTasks(updatedTasks);
    console.log('TASKS', tasks);

    // Close the edit modal after editing
    setEditModalOpen(false);
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
        <button className={classes.addTaskButton} onClick={() => setOpenModal(true)}>
          Add Task
        </button>
      </div>
      <Dialog className={classes.modal} open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle className={classes.modalTitle}>Add Task</DialogTitle>
        <DialogContent className={classes.modalContent}>
          <TextField className={classes.selectInput} autoFocus margin='dense' label='Task Name' type='text' fullWidth value={inputValue} onChange={handleInputChange} />
          <FormControl fullWidth>
            <InputLabel id='task-type-label'>Task Type</InputLabel>
            <Select className={classes.selectInput} labelId='task-type-label' value={taskType} onChange={handleTaskTypeChange}>
              <MenuItem value='work'>Work</MenuItem>
              <MenuItem value='home'>Home</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel className={classes.taskLabel}>Task Priority</InputLabel>
            <Select className={classes.selectInput} value={taskPriority} onChange={handleTaskPriorityChange}>
              <MenuItem value='high'>High</MenuItem>
              <MenuItem value='medium'>Medium</MenuItem>
              <MenuItem value='low'>Low</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.modalActions}>
          <Button className={classes.cancel} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button className={classes.addTaskButton} onClick={handleAddTask} variant='contained' color='primary'>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.tableContainer}>
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
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} onEditStart={handleEditStart} onDelete={deleteTask} onComplete={markTaskCompleted} />
      <EditTaskModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} task={editedTask} handleEdit={handleEdit} />;
      <div>
        <h2 className={classes.completedTaskList}>Completed Tasks</h2>
        {completedTasks.map((task) => (
          <p key={task.id} className={classes.individualCompletedTask}>
            {task.text} - {task.type} - {task.priority}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
