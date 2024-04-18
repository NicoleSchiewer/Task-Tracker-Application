import React, { useState } from 'react'
import TaskList from './TaskList';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', type: 'work', priority: 'high' },
        { id: 2, text: 'Task 2', type: 'home', priority: 'low' },
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
                type: 'work'
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

  return (
    <div>
        <h2>Task Tracker</h2>
        <input
        type="text"
        placeholder="Add a new task"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={addTask}>Add Task</button>
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
        <div>
                <h3>Task Summary</h3>
                <p>Incomplete Tasks: {incompleteTaskCount}</p>
                <p>Completed Tasks: {completeTaskCount}</p>
            </div>
    </div>
  )
}

export default ToDoList;