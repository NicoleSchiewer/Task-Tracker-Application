import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import classes from './Task.module.css';

const Task = ({ task, onDelete, onComplete, onEditStart }) => {
  return (
    <div>
      <input className={classes.checkbox} type='checkbox' onClick={() => onComplete(task.id)} />
      <EditIcon className={classes.editIcon} onClick={() => onEditStart(task)} />
      <DeleteIcon className={classes.deleteIcon} onClick={() => onDelete(task.id)} />
    </div>
  );
};

export default Task;
