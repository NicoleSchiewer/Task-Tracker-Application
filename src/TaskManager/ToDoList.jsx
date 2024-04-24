import React, { useEffect, useState } from 'react';
import TaskList from './TaskList/TaskList';
import classes from './ToDoList.module.css';
import AddTaskModal from './Modals/AddTaskModal';
import EditTaskModal from './Modals/EditTaskModal';
import CompletedTaskList from './CompletedTaskList/CompletedTaskList';

const ToDoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [taskType, setTaskType] = useState('work');
  const [taskPriority, setTaskPriority] = useState('low');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project', type: 'work', priority: 'high' },
    { id: 2, text: 'Walk the dog', type: 'home', priority: 'low' },
    { id: 3, text: 'Meal prep lunches', type: 'home', priority: 'medium' }
  ]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [, setIsEditing] = useState(false);
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
    setIsEditing(true);
    const taskBeingEdited = setEditedTask(task);
    return taskBeingEdited;
  };

  useEffect(() => {
    if (editedTask !== null) {
      setEditModalOpen(true);
    }
  }, [editedTask]);

  const handleEdit = (editedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
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
      <AddTaskModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        taskType={taskType}
        handleTaskTypeChange={handleTaskTypeChange}
        taskPriority={taskPriority}
        handleTaskPriorityChange={handleTaskPriorityChange}
        handleAddTask={handleAddTask}
      />

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
      <EditTaskModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} task={editedTask} handleEdit={handleEdit} />
      <div>
        <CompletedTaskList completedTasks={completedTasks} />
      </div>
    </div>
  );
};

export default ToDoList;
