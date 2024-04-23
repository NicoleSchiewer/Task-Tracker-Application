import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from './Task.module.css';

const Task = ({ task, onDelete, onComplete }) => {
  return (
    <div>
      <input
        className={classes.checkbox}
        type='checkbox'
        onClick={() => onComplete(task.id)}
      />
      <DeleteIcon onClick={() => onDelete(task.id)} />
    </div>
  );
};

export default Task;
