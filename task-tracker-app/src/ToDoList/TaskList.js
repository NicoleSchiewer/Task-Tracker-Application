import React from 'react';
import classes from './TaskList.module.css';
import Task from './Task';

const TaskList = ({ tasks, setTasks, setIsEditing, onEditStart, onDelete, onComplete, isEditing }) => {
  return (
    <table className={classes.taskManagerTable}>
      <thead>
        <tr>
          <th>Task</th>
          <th>Type</th>
          <th>Priority</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.text}</td>
            <td>{task.type}</td>
            <td>{task.priority}</td>
            <td>
              <Task
                task={task}
                setTasks={setTasks}
                setIsEditing={setIsEditing}
                onEditStart={onEditStart}
                onDelete={onDelete}
                onComplete={onComplete}
                isEditing={isEditing}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskList;
