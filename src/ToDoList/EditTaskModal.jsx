// EditTaskModal.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditTaskModal = ({ open, handleClose, task, handleEdit }) => {
  const [editedTask, setEditedTask] = useState(task || { text: '', type: '', priority: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    handleEdit(editedTask);
    handleClose();
  };

  if (!task) {
    return null; // Render nothing if task is null or undefined
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
