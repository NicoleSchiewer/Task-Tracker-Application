import React, { useState } from 'react'
import TaskList from './TaskList';
import classes from './ToDoList.module.css';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', type: 'work', priority: 'high' },
        { id: 2, text: 'Task 2', type: 'home', priority: 'low' },
        { id: 3, text: 'Task 3', type: 'home', priority: 'medium' },
    ]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [setEditedText] = useState('');


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addTask = () => {
        if (inputValue !== '') {
            const newTask = {
                id: tasks.length + 1,
                text: inputValue.trim(),
                type: 'work',
                priority: 'low'
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
        };
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const markTaskCompleted = (taskId) => {
        const taskToComplete = tasks.find(task => task.id === taskId);
        if (taskToComplete) {
            setCompletedTasks([...completedTasks, taskToComplete]);
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    }
    const handleEditStart = (task) => {
        setIsEditing(task.id);
        setEditedText(task.text);
    };



    const incompleteTaskCount = tasks.length;
    const completeTaskCount = completedTasks.length;

    const getPriorityCounts = () => {
        const priorityCounts = {
            high: 0,
            medium: 0,
            low: 0
        };

        tasks.forEach(task => {
            priorityCounts[task.priority]++;
        });

        return priorityCounts;
    };

    const priorityCounts = getPriorityCounts();
  return (
    <div className={classes.taskTrackerContainer}>
        <h1 className={classes.taskTrackerHeader}>Task Manager</h1>
        <input
        type="text"
        placeholder="Add a new task"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={addTask}>Add Task</button>
      <table className={classes.completeIncompleteTable}>
        <thead>
            <tr>
                <th>Completed</th>
                <th>Incomplete</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{completeTaskCount}</td>
                <td>{incompleteTaskCount}</td>
            </tr>
        </tbody>
      </table>
      
    <table className={classes.priorityTable}>
        <thead>
            <tr>
                <th>Priority</th>
                <th>Number of Tasks</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(priorityCounts).map(([priority, count]) => (
                <tr key={priority}>
                    <td>{priority}</td>
                    <td>{count}</td>
                </tr>
            ))}
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
            {completedTasks.map(task => (
                <p key={task.id}>
                    <input
                    type="checkbox"
                    checked
                    disabled
                    />
                    {task.text} - {task.type} - {task.priority}
                </p>
            ))}
        </div>
    </div>
  )
}

export default ToDoList;