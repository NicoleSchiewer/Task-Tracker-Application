import React, { useState } from 'react';
import classes from './EditTaskModal.module.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditTaskModal = ({ open, handleClose, task, handleEdit }) => {
  const [editedTask, setEditedTask] = useState(task || { text: '', type: '', priority: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, id: task.id, [name]: value });
  };

  const handleSave = () => {
    handleEdit(editedTask);
    handleClose();
  };

  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.modal}>
      <DialogTitle className={classes.modalTitle}>Edit Task</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin='dense' label='Task Name' type='text' fullWidth name='text' value={editedTask.text} onChange={handleChange} />
        <FormControl fullWidth>
          <InputLabel id='task-type-label'>Task Type</InputLabel>
          <Select labelId='task-type-label' value={editedTask.type} name='type' onChange={handleChange}>
            <MenuItem value='work'>Work</MenuItem>
            <MenuItem value='home'>Home</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Task Priority</InputLabel>
          <Select value={editedTask.priority} name='priority' onChange={handleChange}>
            <MenuItem value='high'>High</MenuItem>
            <MenuItem value='medium'>Medium</MenuItem>
            <MenuItem value='low'>Low</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button className={classes.cancel} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={classes.editTaskButton} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
