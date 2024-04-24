import React from 'react';
import classes from './CompletedTaskList.module.css';

const CompletedTaskList = ({ completedTasks }) => {
  return (
    <div>
      <h2 className={classes.completedTaskList}>Completed Tasks</h2>
      {completedTasks.map((task) => (
        <p key={task.id} className={classes.individualCompletedTask}>
          {task.text} - {task.type} - {task.priority}
        </p>
      ))}
    </div>
  );
};

export default CompletedTaskList;
