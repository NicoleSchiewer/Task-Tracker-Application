import React from 'react';
import classes from './TaskList.module.css';
import Task from '../Task/Task';

const TaskList = ({ tasks, setTasks, onEditStart, onDelete, onComplete }) => {
  return (
    <table className={classes.taskManagerTable}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Type</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id} className={index % 2 === 0 ? classes.lightPurpleRow : ''}>
            <td>{task.id}</td>
            <td>{task.text}</td>
            <td>{task.type}</td>
            <td>{task.priority}</td>
            <td>
              <Task task={task} setTasks={setTasks} onEditStart={onEditStart} onDelete={onDelete} onComplete={onComplete} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
