import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const ToDoList = () => {
    const [inputValue, setInputValue] = useState('')
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1' },
        { id: 2, text: 'Task 2' },
    ]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addTask = () => {
        if (inputValue.trim !== '') {
            const newTask = {
                id: tasks.length + 1,
                text: inputValue.trim()
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
        };
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

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
        <div>
            {tasks.map(task => (
                <p key={task.id}>{task.text}<DeleteIcon onClick={() => deleteTask(task.id)} /></p> 
            ))}
        </div>
    </div>
  )
}

export default ToDoList;